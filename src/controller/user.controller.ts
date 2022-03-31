import { Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  CreateUserInput,
  deleteUserInput,
  ForgetPasswordInput,
  ResetPasswordSchema,
  updateUserSchema,
  VerifyUserInput,
} from "../schema/user.schema";
import { signAccessToken, signRefreshToken } from "../service/auth.service";
import {
  createUser,
  findUsers,
  findUserById,
  findUserByEmail,
} from "../service/user.service";
import log from "../utils/logger";
import sendEmail from "../utils/mailer";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;

  try {
    const user = await createUser(body);

    sendEmail({
      from: "1332969599@qq.com",
      to: user.email,
      subject: "Please verify your account",
      text: `http://localhost:5020/api/users/verify/${user._id}/${user.verificationCode}`,
    });

    return res.send("user successfully created");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send([{ message: "Account already exists" }]);
    }

    return res.status(500).send([{ message: e.message }]);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;

  const user = await findUserById(id);

  if (!user) {
    return res.send("Could not verify user.");
  }

  if (user.verified) {
    return res.send("User is already verified.");
  }

  if (user.verificationCode == verificationCode) {
    user.verified = true;

    await user.save();

    return res.send("User successfully verified");
  }

  return res.send("Could not veriy user");
}

export async function forgetPasswordHandler(
  req: Request<{}, {}, ForgetPasswordInput>,
  res: Response
) {
  const message =
    "If a user with that is registerd yout will receive a password reset email";

  const { email } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    log.debug(`User with email ${email} does not exists`);
    return res.status(200).send([{ message: message }]);
  }

  if (!user.verified) {
    return res.status(400).send([{ message: "User is not verified" }]);
  }

  const passwordResetCode = nanoid();

  user.passwordResetCode = passwordResetCode;

  await user.save();

  await sendEmail({
    from: "1332969599@qq.com",
    to: user.email,
    subject: "Please verify your account",
    text: `http://localhost:3000/users/password/new
id:${user._id}
reset code:${user.passwordResetCode}`,
  });

  log.debug(`Password is send to ${user.email}`);
  return res.status(200).send([{ message: message }]);
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordSchema["params"], {}, ResetPasswordSchema["body"]>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;

  const { password } = req.body;

  let user;

  try {
    user = await findUserById(id);
  } catch (error) {
    return res.status(400).send([{ message: "Could not reset user password" }]);
  }

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send([{ message: "Could not reset user password" }]);
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return res.send("Successfully updated password");
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}

export async function getAllUserHandler(req: Request, res: Response) {
  const users = await findUsers({});

  return res.send(users);
}

export async function deleteUserHandler(
  req: Request<deleteUserInput, {}, {}>,
  res: Response
) {
  const { id } = req.params;

  const actionUser = res.locals.user;

  let user;

  try {
    user = await findUserById(id);
  } catch (error) {
    return res.status(400).send([{ message: "User does not exists" }]);
  }

  if (!user || user.isDelete) {
    return res.status(400).send([{ message: "User does not exists" }]);
  }

  if (actionUser.isAdmin) {
    user.isDelete = true;
    await user.save();
    res.send("User successfully deleted");
  }

  if (actionUser._id == id) {
    user.isDelete = true;
    await user.save();
    res.send("User successfully deleted");
  }

  res
    .status(401)
    .send([{ message: "You are not authorized to delete this user" }]);
}

export async function updateUserHandler(
  req: Request<updateUserSchema["params"], {}, updateUserSchema["body"]>,
  res: Response
) {
  const { id } = req.params;
  const actionUser = res.locals.user;

  let updateUser: updateUserSchema["body"] = {};

  const { name, email, avatar } = req.body;

  if (name) {
    updateUser["name"] = name;
  }

  if (email) {
    updateUser["email"] = email;
  }

  if (avatar) {
    updateUser["avatar"] = avatar;
  }

  let user;

  try {
    user = await findUserById(id);
  } catch (error) {
    return res.status(400).send([{ message: "Could not change user" }]);
  }

  if (!user) {
    return res.status(400).send([{ message: "Could not change user" }]);
  }

  if (actionUser._id == id) {
    // update user
    Object.assign(user, updateUser);
    await user.save();
    // sign new token

    const accessToken = signAccessToken(user);

    const refresh = await signRefreshToken({ userId: user._id });

    return res.send({ accessToken, refresh });
  }

  return res.status(400).send([{ message: "Could not change user" }]);
}
