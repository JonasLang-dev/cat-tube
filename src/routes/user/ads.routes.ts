import express from "express";
import { getAdsHandler } from "../../controller/ads.controller";

const router = express.Router();

router.get("/", getAdsHandler);

export default router;
