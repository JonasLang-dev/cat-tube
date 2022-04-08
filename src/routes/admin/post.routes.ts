import express from "express"
import { findAllPostsHandler, inActivePostHandler, activePostHandler } from "../../controller/post.controller";
import validateResource from "../../middleware/validateResourse";
import { adminPostSchema } from "../../schema/post.schema";

const router = express.Router();

router.get("/", findAllPostsHandler)

router.put("/:id",validateResource(adminPostSchema), activePostHandler)

router.delete("/:id",validateResource(adminPostSchema), inActivePostHandler)

export default router;