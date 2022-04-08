import express from "express";
import { createChargeHandler } from "../../controller/user.controller";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.post("/", requireUser, createChargeHandler);

export default router;
