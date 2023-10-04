import UserController from "../controllers/User";
import express from "express";
import auth from "../middleware/auth"

const userRouter = express.Router()

const userController: UserController = new UserController()

userRouter.route('/login').post(userController.login)
userRouter.route('/register').post(userController.register)
userRouter.route('/me').get(auth.auth, userController.me)
userRouter.route('/reset').post(auth.auth, userController.updatePassword)

export default userRouter

