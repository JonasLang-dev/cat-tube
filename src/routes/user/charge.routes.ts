import express from "express";
import { createChargeHandler, inActiveUserPremuimHandler } from "../../controller/user.controller";
import requireUser from "../../middleware/requireUser";

const router = express.Router();

router.post("/", requireUser, createChargeHandler);

router.delete("/:id", requireUser, inActiveUserPremuimHandler);

export default router;
