import express from "express"
import { createSessionHandler, refreshAccessTokenHandler, getSessionHandler, removeSessionHandler } from "../../controller/auth.controller"
import requireUser from "../../middleware/requireUser"
import validateResource from "../../middleware/validateResourse"
import { createSessionSchema, removeSessionSchema } from "../../schema/auth.schema"

const router = express.Router()

router.post("/", validateResource(createSessionSchema), createSessionHandler)

router.get("/refresh", refreshAccessTokenHandler)

router.get("/", requireUser, getSessionHandler)

router.delete("/:id", requireUser, validateResource(removeSessionSchema), removeSessionHandler)

export default router