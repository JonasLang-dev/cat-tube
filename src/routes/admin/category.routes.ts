import express from "express";
import {
  createCatoegoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  updateCategoryHandler,
} from "../../controller/category.controller";
import validateResource from "../../middleware/validateResourse";
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "../../schema/category.schema";

const router = express.Router();

router.get("/", getCategoriesHandler);

router.post(
  "/",
  validateResource(createCategorySchema),
  createCatoegoryHandler
);

router.put(
  "/:id",
  validateResource(updateCategorySchema),
  updateCategoryHandler
);

router.delete(
  "/:id",
  validateResource(deleteCategorySchema),
  deleteCategoryHandler
);

export default router;
