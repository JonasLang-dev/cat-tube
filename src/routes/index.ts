import express, { Request, Response } from "express";
import user from "./user";
import admin from "./admin";

const router = express.Router();

router.get("/healthcheck", (_req: Request, res: Response) =>
  res.sendStatus(200)
);

router.use("/", user);
router.use("/", admin);

export default router;
