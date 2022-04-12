import express from "express";
import { findPostsHandler, findOwnPostsHandler, createPostHandler, updatePostHandler, updatePostViewsHandler, deletePostHandler, postMoreInfoHandler, updatePosterHandler } from "../../controller/post.controller";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResourse";
import { createPostSchema, postSchema, updatePostSchema } from "../../schema/post.schema";
import { upload } from "../../utils/multer";

const router = express.Router();

router.get("/", findPostsHandler)

router.get("/private", requireUser, findOwnPostsHandler);

router.post("/", requireUser, validateResource(createPostSchema), createPostHandler);

router.put("/:id", requireUser, validateResource(updatePostSchema), updatePostHandler);

router.put("/:id/views", validateResource(postSchema), updatePostViewsHandler);

router.delete("/:id", requireUser, validateResource(postSchema), deletePostHandler);

router.get("/:id", validateResource(postSchema), postMoreInfoHandler);

router.post("/:id", requireUser, validateResource(postSchema), upload.single("poster"), updatePosterHandler);

export default router;
