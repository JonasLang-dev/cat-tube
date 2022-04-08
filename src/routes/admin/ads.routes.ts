import express from "express";
import { createAdsHandler, deleteAdsHandler, getAdsHandler } from "../../controller/ads.controller";
import validateResource from "../../middleware/validateResourse";
import { deleteAdsSchema } from "../../schema/ads.schema";
import { upload } from "../../utils/multer";

const router = express.Router();

router.get("/", getAdsHandler)

router.post("/",
    upload.single("ads"),
    createAdsHandler)

router.delete("/:id", validateResource(deleteAdsSchema), deleteAdsHandler)

export default router;