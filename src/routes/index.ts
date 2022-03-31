import express, { Request, Response } from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import post from "./post.routes";
import upload from "./upload.routes";

const router = express.Router();

router.get("/healthcheck", (req: Request, res: Response) =>
  res.sendStatus(200)
);

router.use(user);
router.use(auth);
router.use(post);
router.use(upload);

export default router;
