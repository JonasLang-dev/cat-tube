import express from "express";
import category from "./category.routes";
import user from "./user.routes";
import post from "./post.routes";
import session from "./auth.routes";
import ads from "./ads.routes"

const router = express.Router();

router.use("/category", category);
router.use("/user", user);
router.use("/post", post);
router.use("/session", session)
router.use("/ads", ads);

export default router;
