import { Request, Response } from "express";
import { get } from "lodash";
import { CreateSessionInput, RemoveSessionInput } from "../schema/auth.schema";
import {
  findSessionById,
  findSessions,
  signAccessToken,
  signRefreshToken,
} from "../service/auth.service";
import { findUserById, findUserByEmail } from "../service/user.service";
import { verifyJwt } from "../utils/jwt";

export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) => {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(400).send({ message: message });
  }

  if (!user.verified) {
    return res.status(400).send({ message: "Please verify your email" });
  }

  if (user.isDelete) {
    return res.status(400).send({ message: message });
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.status(400).send({ message: message });
  }

  // sign a access token
  const accessToken = signAccessToken(user);

  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id });

  // send the tokens
  return res.send({
    accessToken,
    refreshToken,
  });
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const refreshToken = get(req, "headers.x-refresh");

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return res
      .status(401)
      .send({ message: "Could not refresh access token" });
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res
      .status(401)
      .send({ message: "Could not refresh access token" });
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send({ message: "Could not refresh token" });
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
};

export const getSessionHandler = async (_req: Request, res: Response) => {
  const sessions = await findSessions({ "user": res.locals.user._id });
  return res.send({data: sessions});

};

export const removeSessionHandler = async (req: Request<RemoveSessionInput, {}, {}>, res: Response) => {
  const session = await findSessionById(req.params.id);

  if (!session || !session.valid) {
    return res.status(400).send({ message: "Could not remove session" });
  }

  if (session.user != res.locals.user._id) {
    res.status(400).send({ message: "Could not remove session" });
  }

  session.valid = false;

  session.save()

  return res.send({ message: "Session removed" });

}

export const getAllSessionHandler = async (req: Request, res: Response) => {
  const sessions = await findSessions({});
  return res.send({data: sessions});
}

export const removeSessionByAdminHandler = async (req: Request<RemoveSessionInput, {}, {}>, res: Response) => {
  const session = await findSessionById(req.params.id);

  if (!session || !session.valid) {
    return res.status(400).send({ message: "Could not remove session" });
  }

  session.valid = false;

  session.save()

  return res.send({ message: "Session removed" });
}