import express, { Request, Response } from "express";
import {
  createUserHandler,
  forgetPasswordHandler,
  getAllUserHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
  deleteUserHandler,
  updateUserHandler,
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResourse";
import {
  createUserSchema,
  deleteUserSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
  updateUserSchema,
} from "../schema/user.schema";

const router = express.Router();

router.post(
  "/api/users",
  validateResource(createUserSchema),
  createUserHandler
);

router.get(
  "/api/users/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.post(
  "/api/users/forgotpassword",
  validateResource(forgetPasswordSchema),
  forgetPasswordHandler
);

router.post(
  "/api/users/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.get("/api/users/current", requireUser, getCurrentUserHandler);

router.get("/api/users", getAllUserHandler);

router.delete(
  "/api/users/:id",
  requireUser,
  validateResource(deleteUserSchema),
  deleteUserHandler
);

router.post(
  "/api/users/:id",
  requireUser,
  validateResource(updateUserSchema),
  updateUserHandler
);

export default router;
