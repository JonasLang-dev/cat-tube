import express from "express";
import {findPostsHandler, findOwnPostsHandler, createPostHandler} from "../../controller/post.controller";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResourse";
import { createPostSchema, updatePostSchema } from "../../schema/post.schema";

const router = express.Router();


// router.get("/", findAllPostsHandler);
router.get("/", findPostsHandler)

router.get("/private", requireUser, findOwnPostsHandler);

router.post("/", requireUser, createPostHandler);
// router.put(
//   "/",
//   requireUser,
//   validateResource(createPostSchema),
//   createPosttHanler
// );
// router.post(
//   "/:id",
//   requireUser,
//   validateResource(updatePostSchema),
//   updatePostHandler
// );
// router.delete("/api/posts/:id", requireUser, deletePostHandler);

export default router;
