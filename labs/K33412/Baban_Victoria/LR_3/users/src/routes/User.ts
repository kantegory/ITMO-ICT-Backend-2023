import UserController from "../controllers/User";
import express from "express";

const userRouter = express.Router()

const userController: UserController = new UserController()

userRouter.route('/login').post(userController.login)
userRouter.route('/register').post(userController.register)
userRouter.route('/me').get(userController.me)
userRouter.route('/reset').post(userController.updatePassword)
userRouter.route('/auth').all(userController.auth)

export default userRouter

