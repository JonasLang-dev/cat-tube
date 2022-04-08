import express from "express";
import { getCategoriesHandler } from "../../controller/category.controller";

const router = express.Router();

router.get("/", getCategoriesHandler);

export default router;
