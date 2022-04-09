import express from "express";
import { searchController } from "../../controller/history.controller";
import validateResource from "../../middleware/validateResourse";
import { createSearchSchema } from "../../schema/history.schema";

const router = express.Router();

router.get(
  "/",
  validateResource(createSearchSchema),
  searchController
);

export default router;
