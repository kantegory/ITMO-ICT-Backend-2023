import express from "express";

import UserController from "~/controllers/users/User";
import { isAuthenticated } from "~/middleware";

const userRoutes = express.Router();
const controller = new UserController();

userRoutes.route("/").get(isAuthenticated, controller.getAll);

userRoutes.route("/").post(isAuthenticated, controller.post);

userRoutes.route("/:id").get(isAuthenticated, controller.get);

userRoutes.route("/:id").patch(isAuthenticated, controller.patch);

userRoutes.route("/:id").delete(isAuthenticated, controller.delete);

userRoutes.route("/register").post(controller.register);

userRoutes.route("/login").post(controller.login);

// Expects refreshToken in body
userRoutes.route("/refreshToken").post(controller.refreshToken);

// Expects refreshToken in body
userRoutes.route("/me").post(controller.me);

// Reset password

// logout

export default userRoutes;
