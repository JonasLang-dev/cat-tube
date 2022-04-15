import express from "express";
import { searchController } from "../../controller/history.controller";
import validateResource from "../../middleware/validateResourse";
import { createSearchSchema } from "../../schema/history.schema";

const search = express.Router();

search.get(
  "/",
  validateResource(createSearchSchema),
  searchController
);

export default search;
