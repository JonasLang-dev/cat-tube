import express from "express"
import { createLikeHandler, getLickPostsHandler, getPostLikesHandler, removeLikeHandler } from "../../controller/like.controller";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResourse";
import { createLikeSchema, postLikesSchema, removeLikeSchema } from "../../schema/like.schema";

const router = express.Router();

router.post("/", requireUser, validateResource(createLikeSchema), createLikeHandler)

router.delete("/:id", requireUser, validateResource(removeLikeSchema), removeLikeHandler);

router.get("/post", requireUser, getLickPostsHandler);

router.get("/:post/post", requireUser, validateResource(postLikesSchema), getPostLikesHandler);

export default router