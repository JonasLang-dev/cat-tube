import express, { Request, Response } from "express"
import { createSessionHandler, refreshAccessTokenHandler, getSessionHandler } from "../controller/auth.controller"
import requireUser from "../middleware/requireUser"
import validateResource from "../middleware/validateResourse"
import { createSessionSchema } from "../schema/auth.schema"

const router = express.Router()

router.post("/api/session", validateResource(createSessionSchema), createSessionHandler)

router.get("/api/session/refresh", refreshAccessTokenHandler)

router.get("/api/session", requireUser, getSessionHandler)

export default router