import multer from "multer";
import { NextFunction, Request, Response } from "express";
import express from "express";

const storage = multer.diskStorage({
  destination(req: Request, _file: Express.Multer.File, cb) {
    cb(null, `uploads/`);
  },
  filename(req: Request, file: Express.Multer.File, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
})

export const upload = multer({
  storage
});