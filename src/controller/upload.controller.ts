import express = require("express");
import { RequestHandler, Request, Response } from "express-serve-static-core";
import fileUpload = require("express-fileupload");
import log from "../utils/logger";

type UploadedFile = fileUpload.UploadedFile;

const app: express.Express = express();

function isSingleFile(
  file: UploadedFile | UploadedFile[]
): file is UploadedFile {
  return typeof file === "object" && (file as UploadedFile).name !== undefined;
}

function isFileArray(
  file: UploadedFile | UploadedFile[]
): file is UploadedFile[] {
  return Array.isArray(file);
}

export const uploadAvatarHandler: RequestHandler = (
  req: Request,
  res: Response
) => {
  if (typeof req.files == "object") {
    const avatarField = req.files.avatar;
    if (isSingleFile(avatarField)) {
      avatarField.mv("/uploads", (err) => {
        if (err) {
          log.error("Error while copying file to target location");
        }
      });

      res.send({
        message: "Avatar is uploaded",
        data: {
          name: avatarField.name,
          mimetype: avatarField.mimetype,
          size: avatarField.size,
        },
      });
    }
    res.status(400);
  } else {
    res.status(400).send({ message: "No file uploaded" });
  }
};
