import express, { Request, Response } from "express"
import { createUserHandler, verifyUserHandler } from "../controller/user.controller"
import validateResource from "../middleware/validateResourse"
import { createUserSchema, verifyUserSchema } from "../schema/user.schema"

const router = express.Router()

router.post("/api/users", validateResource(createUserSchema), createUserHandler)

router.get("/api/user/verify/:id/:verificationCode", validateResource(verifyUserSchema), verifyUserHandler)


export default router