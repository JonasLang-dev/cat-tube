import express, { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import config from "config";
import requireUser from "../middleware/requireUser";
import { logger } from "@typegoose/typegoose/lib/logSettings";

const port = config.get<number>("port");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, `uploads/`);
  },
  filename(req: Request, file: Express.Multer.File, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post(
  "/api/upload/video",
  requireUser,
  async (req: Request, res: Response) => {
    try {
      const fileName = `${Date.now()}.mp4`;
      const path = `uploads/${fileName}`;
      const data = req.body.video;

      // to convert base64 format into random filename

      const base64Data = data.replace("data:video/mp4;base64,", "");

      fs.writeFileSync(path, base64Data, { encoding: "base64" });

      return res.send({
        message: `/${fileName}`,
      });
    } catch (e) {
      return res.status(400).send({ message: "Error while uploading" });
    }
  }
);

router.post(
  "/api/upload/poster",
  upload.single("poster"),
  requireUser,
  (req: Request, res: Response) => {
    logger.log(req.file);

    if (req.file) {
      res.send({ payload: req.file });
    } else {
      res.send({ message: "Error while uploading" });
    }
  }
);

export default router;
