import express, { Request, Response } from "express"
import { createSessionHandler } from "../controller/auth.controller"
import validateResource from "../middleware/validateResourse"
import { createSessionSchema } from "../schema/auth.schema"

const router = express.Router()

router.post("/api/session", validateResource(createSessionSchema), createSessionHandler)

export default router