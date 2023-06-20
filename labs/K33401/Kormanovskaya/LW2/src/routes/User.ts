import express from "express";
import UserController from "../controllers/UserController";
import { checkJWT } from "../middlewares/checkJWT";

const router: express.Router = express.Router();

const userController = new UserController();

router.route("/").get(userController.getAllUsers);

router.route("/me").get(checkJWT, userController.getMe);

export default router;
