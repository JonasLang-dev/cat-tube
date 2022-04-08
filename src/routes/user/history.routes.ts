import express from "express";
import {
  createHistoryController,
  deleteHistoryController,
  deleteTypeHistoryController,
  getAllHistoryController,
  getTypeHistoryController,
} from "../../controller/history.controller";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResourse";
import {
  createHistorySchema,
  deleteHistorySchema,
  historyTypeSchema,
} from "../../schema/history.schema";

const router = express.Router();

router.get("/", requireUser, getAllHistoryController);

router.post(
  "/",
  requireUser,
  validateResource(createHistorySchema),
  createHistoryController
);

router.delete(
  "/:id",
  requireUser,
  validateResource(deleteHistorySchema),
  deleteHistoryController
);

router.get(
  "/:type",
  requireUser,
  validateResource(historyTypeSchema),
  getTypeHistoryController
);

router.delete(
  "/:type/type",
  requireUser,
  validateResource(historyTypeSchema),
  deleteTypeHistoryController
);

export default router;
