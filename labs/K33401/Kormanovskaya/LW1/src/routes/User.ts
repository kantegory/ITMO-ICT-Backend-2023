import express from "express";
import UserController from "../controllers/UserController";
import { checkJWT } from "../middlewares/checkJWT";

const router: express.Router = express.Router();

const userController = new UserController();

router.route("/").get(userController.getAllUsers);

router.route("/my_examples").get(checkJWT, userController.getMyExamples);

router
  .route("/my_examples/:id")
  .post(checkJWT, userController.addUserExampleEntity);

router
  .route("/my_examples/:id")
  .delete(checkJWT, userController.removeUserExampleEntity);

export default router;
