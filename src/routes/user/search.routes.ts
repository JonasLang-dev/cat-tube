import express from "express";
import { createSearchController } from "../../controller/history.controller";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResourse";
import { createSearchSchema } from "../../schema/history.schema";

const router = express.Router();

router.post(
  "/",
  requireUser,
  validateResource(createSearchSchema),
  createSearchController
);

export default router;
