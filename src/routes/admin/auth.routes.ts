import express from "express"
import { getAllSessionHandler, removeSessionByAdminHandler } from "../../controller/auth.controller";
import validateResource from "../../middleware/validateResourse";
import { removeSessionSchema } from "../../schema/auth.schema";

const router = express.Router();

router.get("/", getAllSessionHandler)

router.delete("/:id", validateResource(removeSessionSchema), removeSessionByAdminHandler)

export default router