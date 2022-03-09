import jwt from "jsonwebtoken";
import config from "config";
import logger from "./logger";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export const signJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  try {
    const data = jwt.sign(object, privateKey, {
      ...(options && options),
      algorithm: "RS256",
    });
    return data;
  } catch (e: any) {
    logger.error(e.code);

    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
