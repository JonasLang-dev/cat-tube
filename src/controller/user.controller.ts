import { Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  CreateUserInput,
  ForgetPasswordInput,
  ResetPasswordSchema,
  UpdatePasswordInput,
  UpdateUserInput,
  VerifyUserInput,
} from "../schema/user.schema";
import { signAccessToken, signRefreshToken } from "../service/auth.service";
import {
  createUser,
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

export async function getCurrentUserHandler(_req: Request, res: Response) {
  return res.send(res.locals.user);
}

export async function getUserHandler(_req: Request, res: Response) {
  const user = await findUserById(res.locals.user._id, "posts subscribers");

  return res.send(user);
}

export async function deleteUserHandler(_req: Request, res: Response) {
  const actionUser = res.locals.user;

  const user = await findUserById(actionUser._id);

  if (!user || user.isDelete) {
    return res.status(400).send({ message: "User does not exists" });
  }

  user.isDelete = true;
  await user.save();

  res.send({ message: "User successfully deleted" });
}

export async function updateUserHandler(
  req: Request<{}, {}, UpdateUserInput>,
  res: Response
) {
  const actionUser = res.locals.user;

  let updateUser: UpdateUserInput = {};

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

  const user = await findUserById(actionUser._id);

  if (!user || user.isDelete) {
    return res.status(400).send([{ message: "Could not change user" }]);
  }

  // update user
  Object.assign(user, updateUser);

  await user.save();

  // sign new token
  const accessToken = signAccessToken(user);

  const refresh = await signRefreshToken({ userId: user._id });

  return res.send({ accessToken, refresh });
}

export async function updateAvatarHandler(req: Request, res: Response) {
  const actionUser = res.locals.user;

  const user = await findUserById(actionUser._id);

  if (!user || user.isDelete) {
    return res.status(400).send({ message: "Could not change user avatar" });
  }

  if (!req.file) {
    return res.status(400).send({ message: "Could not change user avatar" });
  }

  const { filename } = req.file;

  user.avatar = filename;

  await user.save();

  // sign new token
  const accessToken = signAccessToken(user);

  const refresh = await signRefreshToken({ userId: user._id });

  return res.send({ accessToken, refresh });
}

export async function updatePasswordHandler(
  req: Request<{}, {}, UpdatePasswordInput>,
  res: Response
) {
  const { _id } = res.locals.user;

  const { oldPassword, newPassword } = req.body;

  const user = await findUserById(_id);

  if (!user || user.isDelete) {
    return res.status(400).send({ message: "Could not change user password" });
  }

  const isValid = await user.validatePassword(oldPassword);

  if (!isValid) {
    res.status(400).send({ message: "Could not change user password" });
  }

  user.password = newPassword;

  await user.save();

  // sign new token
  const accessToken = signAccessToken(user);

  const refresh = await signRefreshToken({ userId: user._id });

  return res.send({ accessToken, refresh });
}

export async function createChargeHandler(req: Request, res: Response) {
  const user = await findUserById(res.locals.user._id);

  if (!user || user.isDelete || user.isPremium) {
    return res.status(400).send({ message: "Could not create charge" });
  }

  user["isPremium"] = true;

  try {
    await user.save();
    return res.status(200).send({ message: "Successfully created charge" });
  } catch (error) {
    return res.status(400).send({ message: "Could not create charge" });
  }
}