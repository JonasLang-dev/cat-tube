import express from "express";
import {
  createCommentHandler,
  removeCommentHandler,
  updateCommentHandler,
  findOwnCommentHandler,
  findPostCommentsHandler,
  findUserCommentsHandler,
} from "../controller/comment.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResourse";
import {
  createCommentSchema,
  updateCommentSchema,
  removeCommentSchema,
  getPostCommentsSchema,
  getUsreCommentsSchema,
} from "../schema/comment.schema";

const router = express.Router();

router.post(
  "/",
  requireUser,
  validateResource(createCommentSchema),
  createCommentHandler
);

router.put(
  "/:id",
  requireUser,
  validateResource(updateCommentSchema),
  updateCommentHandler
);

router.delete(
  "/:id",
  requireUser,
  validateResource(removeCommentSchema),
  removeCommentHandler
);

router.get("/", requireUser, findOwnCommentHandler);
router.get(
  "/:post/post",
  validateResource(getPostCommentsSchema),
  findPostCommentsHandler
);
router.get(
  "/:user/user",
  validateResource(getUsreCommentsSchema),
  findUserCommentsHandler
);

export default router;
