import express from "express";
import user from "./user.routes";
import auth from "./auth.routes";
import post from "./post.routes";
import upload from "./upload.routes";
import like from "./like.routes";
import subscription from "./subscription.routes";
import category from "./category.routes";
import reply from "./reply.routes";
import history from "./history.routes";
import search from "./search.routes";

const router = express.Router();

router.use("/users", user);
router.use("/session", auth);
router.use("/posts", post);
router.use("/like", like);
router.use("/sub", subscription);
router.use("/category", category);
router.use("/reply", reply);
router.use("/history", history);
router.use("/search", search);
router.use(upload);

export default router;
