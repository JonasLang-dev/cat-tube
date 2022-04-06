import multer from "multer";
import { Request, Response } from "express";

const storage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, `uploads/`);
  },
  filename(req: Request, file: Express.Multer.File, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
