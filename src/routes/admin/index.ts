import express from "express";
import category from "./category.routes";

const router = express.Router();

router.use("/category", category);

export default router;
