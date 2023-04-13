import express from "express";
import UserController from "~/controllers/users/User";

const router = express.Router();

const controller = new UserController();

router.route("/").post(controller.post);

router.route("/profile/:id").get(controller.get);

router.route("/login").post(controller.auth);

router.route("/refresh").post(controller.refreshToken);

export default router;
