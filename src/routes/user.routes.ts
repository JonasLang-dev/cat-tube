import express, { Request, Response } from "express"
import { createUserHandler, forgetPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from "../controller/user.controller"
import requireUser from "../middleware/requireUser"
import validateResource from "../middleware/validateResourse"
import { createUserSchema, forgetPasswordSchema, resetPasswordSchema, verifyUserSchema } from "../schema/user.schema"

const router = express.Router()

router.post("/api/users", validateResource(createUserSchema), createUserHandler)

router.get("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), verifyUserHandler)

router.post("/api/users/forgotpassword", validateResource(forgetPasswordSchema), forgetPasswordHandler)

router.post("/api/users/resetpassword/:id/:passwordResetCode", validateResource(resetPasswordSchema), resetPasswordHandler)

router.get('/api/users/current', requireUser, getCurrentUserHandler)

export default router