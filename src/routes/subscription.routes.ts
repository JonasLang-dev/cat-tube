import express from "express";
import {
  createSubHnadler,
  removeSubHnadler,
  getOwnSubsHandler,
  getPostsFromChannelHandler,
  getOwnChannelHandler,
  getOwnSubscribersHandler,
} from "../controller/subscription.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResourse";
import {
  createSubSchema,
  getChannelSchema,
  removeSubSchema,
} from "../schema/subscription.schema";

const router = express.Router();

router.get("/", requireUser, getOwnSubsHandler);

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

router.get("/subscribers", requireUser, getOwnSubscribersHandler);

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

export default router;
