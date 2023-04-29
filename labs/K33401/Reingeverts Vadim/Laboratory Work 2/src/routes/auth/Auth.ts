import express from "express";
import AuthController from "~/controllers/auth/Auth";

const authRoutes = express.Router();
const controller = new AuthController();

// authRoutes.route("/register").post(controller.register);
// authRoutes.route("/findRefreshTokenById").post(controller.findRefreshTokenById);
// authRoutes.route("/deleteRefreshToken").post(controller.deleteRefreshToken);
// authRoutes.route("/revokeTokens").post(controller.revokeTokens);

export default authRoutes;
