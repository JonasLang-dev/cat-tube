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
} from "../../controller/user.controller";
import requireUser from "../../middleware/requireUser";
import validateResource from "../../middleware/validateResourse";
import {
  createUserSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
  updateUserSchema,
  updatePasswordSchema,
} from "../../schema/user.schema";
import { upload } from "../../utils/multer";

const router = express.Router();

router.get("/", requireUser, getUserHandler);

router.post(
  "/",
  validateResource(createUserSchema),
  createUserHandler
);

router.put("/", requireUser, validateResource(updateUserSchema), updateUserHandler);

router.delete("/", requireUser, deleteUserHandler);

router.get("/current", requireUser, getCurrentUserHandler);

router.get(
  "/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.put(
  "/forgotpassword",
  validateResource(forgetPasswordSchema),
  forgetPasswordHandler
);

router.put(
  "/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.put(
  "/avatar",
  requireUser,
  upload.single("avatar"),
  updateAvatarHandler
);

router.put(
  "/password/new",
  requireUser,
  validateResource(updatePasswordSchema),
  updatePasswordHandler
);

export default router;
