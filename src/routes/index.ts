import express, { Request, Response } from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import post from "./post.routes";
import upload from "./upload.routes";
import like from "./like.routes";
import sub from "./sub.routes";

const router = express.Router();

router.get("/healthcheck", (_req: Request, res: Response) =>
  res.sendStatus(200)
);

router.use("/users", user);
router.use("/session", auth);
router.use("/posts", post);
router.use("/like", like);
router.use("/sub", sub);
router.use(upload);

export default router;
