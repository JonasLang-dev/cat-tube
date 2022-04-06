import express from "express"
import { createLikeHandler, getLickPostsHandler, removeLikeHandler } from "../controller/like.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResourse";
import { createLikeSchema, removeLikeSchema } from "../schema/like.schema";

const router = express.Router();

router.post("/", requireUser, validateResource(createLikeSchema), createLikeHandler)

router.delete("/:id", requireUser, validateResource(removeLikeSchema), removeLikeHandler);

router.get("/posts", requireUser, getLickPostsHandler);

export default router