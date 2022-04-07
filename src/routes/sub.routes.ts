import express from "express";
import {
  createSubHnadler,
  removeSubHnadler,
  getOwnSubsHandler,
  getPostsFromChannelHandler,
  getOwnChannelHandler,
  getOwnSubscribersHandler,
} from "../controller/sub.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResourse";
import {
  createSubSchema,
  getChannelSchema,
  removeSubSchema,
} from "../schema/sub.schema";

const router = express.Router();

router.post(
  "/",
  requireUser,
  validateResource(createSubSchema),
  createSubHnadler
);

router.delete(
  "/:id",
  requireUser,
  validateResource(removeSubSchema),
  removeSubHnadler
);

router.get("/", requireUser, getOwnSubsHandler);

router.get(
  "/posts/channel/:id",
  requireUser,
  validateResource(getChannelSchema),
  getPostsFromChannelHandler
);

router.get(
  "/channel/:id",
  requireUser,
  validateResource(getChannelSchema),
  getOwnChannelHandler
);

router.get("/subscribers", requireUser, getOwnSubscribersHandler);

export default router;
