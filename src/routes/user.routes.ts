import express from "express";
import {
  createUserHandler,
  forgetPasswordHandler,
  getUserHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
  deleteUserHandler,
  updateUserHandler,
  updateAvatarHandler,
  updatePasswordHandler,
} from "../controller/user.controller";
import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResourse";
import {
  createUserSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
  updateUserSchema,
  updatePasswordSchema,
} from "../schema/user.schema";
import { upload } from "../utils/multer";

const router = express.Router();

router.get("/api/users", requireUser, getUserHandler);

router.post(
  "/api/users",
  validateResource(createUserSchema),
  createUserHandler
);

router.put("/api/users", validateResource(updateUserSchema), updateUserHandler);

router.delete("/api/users", deleteUserHandler);

router.get("/api/users/current", requireUser, getCurrentUserHandler);

router.get(
  "/api/users/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.put(
  "/api/users/forgotpassword",
  validateResource(forgetPasswordSchema),
  forgetPasswordHandler
);

router.put(
  "/api/users/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.put(
  "/api/users/avatar",
  requireUser,
  upload.single("avatar"),
  updateAvatarHandler
);

router.put(
  "/api/users/password/new",
  requireUser,
  validateResource(updatePasswordSchema),
  updatePasswordHandler
);

export default router;
