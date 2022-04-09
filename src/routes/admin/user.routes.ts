import express from "express"
import { activeUserByAdminHandler, activeUserPremuimHandler, delegateAdminHandler, deleteUserByAdminHandler, getAllUserHandler, inActiveUserPremuimHandler } from "../../controller/user.controller";
import validateResource from "../../middleware/validateResourse";
import { userByAdminSchema } from "../../schema/user.schema";

const router = express.Router();

router.get("/", getAllUserHandler)

router.delete("/:id", validateResource(userByAdminSchema), deleteUserByAdminHandler)

router.put("/:id", validateResource(userByAdminSchema), activeUserByAdminHandler)

router.put("/:id/premium", validateResource(userByAdminSchema), activeUserPremuimHandler)

router.delete("/:id/premium", validateResource(userByAdminSchema), inActiveUserPremuimHandler)

router.put("/:id/admin", validateResource(userByAdminSchema), delegateAdminHandler)


export default router;