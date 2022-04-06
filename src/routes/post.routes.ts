import express, { Request, Response } from "express";
import {
  createPosttHanler,
  findUserPostsHandler,
  findAllPostsHandler,
  deletePostHandler,
  updatePostHandler,
} from "../controller/post.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResourse";
import { createPostSchema, updatePostSchema } from "../schema/post.schema";

const router = express.Router();


router.get("/api/posts", requireUser, findAllPostsHandler);
router.put(
  "/api/posts",
  requireUser,
  validateResource(createPostSchema),
  createPosttHanler
);
router.post(
  "/api/posts/:id",
  requireUser,
  validateResource(updatePostSchema),
  updatePostHandler
);
router.delete("/api/posts/:id", requireUser, deletePostHandler);

export default router;
