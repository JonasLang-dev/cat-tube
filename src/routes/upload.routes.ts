import express, { Request, Response } from "express";
const router = express.Router();
import { UploadedFile } from "express-fileupload";
import { uploadAvatarHandler } from "../controller/upload.controller";

router.post("/api/upload/avatar", uploadAvatarHandler);

export default router;
