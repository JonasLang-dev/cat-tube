import express, { Request, Response } from "express";
import {
  createPosttHanler,
  findUserPostsHandler,
  findAllPostsHandler,
} from "../controller/post.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResourse";
import { createPostSchema } from "../schema/post.schema";

const router = express.Router();

router.get("/api/posts/:id", requireUser, findUserPostsHandler);
router.get("/api/posts", requireUser, findAllPostsHandler);
router.put(
  "/api/posts",
  requireUser,
  validateResource(createPostSchema),
  createPosttHanler
);

export default router;
