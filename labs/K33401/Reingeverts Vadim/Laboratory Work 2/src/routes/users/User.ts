import express from "express";
import UserController from "~/controllers/users/User";

const userRoutes = express.Router();
const controller = new UserController();

userRoutes.route("/").get(controller.getAll);

userRoutes.route("/").post(controller.post);

userRoutes.route("/:id").get(controller.get);

userRoutes.route("/:id").patch(controller.patch);

userRoutes.route("/:id").delete(controller.delete);

// userRoutes.route("/profile/:id").get(controller.get);

// userRoutes.route("/login").post(controller.auth);

// userRoutes.route("/refresh").post(controller.refreshToken);

userRoutes.route("/register").post(controller.register);
userRoutes.route("/findRefreshTokenById").post(controller.findRefreshTokenById);
userRoutes.route("/deleteRefreshToken").post(controller.deleteRefreshToken);
userRoutes.route("/revokeTokens").post(controller.revokeTokens);

export default userRoutes;
