import express, { Request, Response } from "express";
import {
  createPosttHanler,
  findAllPostsHandler,
} from "../controller/post.controller";
import validateResource from "../middleware/validateResourse";
import { createPostSchema } from "../schema/post.schema";

const router = express.Router();

router.get("/api/posts", findAllPostsHandler);
router.put("/api/posts", validateResource(createPostSchema), createPosttHanler);

export default router;
