import express from "express";
import UserController from "~/controllers/users/User";

const userRoutes = express.Router();
const controller = new UserController();

userRoutes.route("/").get(controller.getAll);

userRoutes.route("/").post(controller.post);

userRoutes.route("/:id").get(controller.get);

userRoutes.route("/:id").patch(controller.patch);

userRoutes.route("/:id").delete(controller.delete);

// router.route("/profile/:id").get(controller.get);

// router.route("/login").post(controller.auth);

// router.route("/refresh").post(controller.refreshToken);

export default userRoutes;
