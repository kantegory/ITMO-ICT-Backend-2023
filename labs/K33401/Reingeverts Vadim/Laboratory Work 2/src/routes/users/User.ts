import express from "express";

import UserController from "~/controllers/users/User";
import { isAuthenticated } from "~/middleware";

const userRoutes = express.Router();
const controller = new UserController();

userRoutes.route("/").get(isAuthenticated, controller.getAll);

userRoutes.route("/").post(controller.post);

userRoutes.route("/:id").get(controller.get);

userRoutes.route("/:id").patch(controller.patch);

userRoutes.route("/:id").delete(controller.delete);

// userRoutes.route("/profile/:id").get(controller.get);

// userRoutes.route("/login").post(controller.auth);

// userRoutes.route("/refresh").post(controller.refreshToken);

userRoutes.route("/register").post(controller.register);
userRoutes.route("/login").post(controller.login);
userRoutes.route("/refreshToken").post(controller.refreshToken);

export default userRoutes;
