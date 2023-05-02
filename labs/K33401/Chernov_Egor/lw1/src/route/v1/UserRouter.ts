import express from "express"
import UserController from "../../controller/v1/UserController"
import portfolioRouter from "./PortfolioRouter";

// Create router and controller
const userRouter: express.Router = express.Router()
const userController: UserController = new UserController()

// User routes
userRouter.route('/list')
    .get(userController.getAll)

userRouter.route('/specific')
    .get(userController.getUser)

userRouter.route('/register')
    .post(userController.postSignupUser)

userRouter.route('/login')
    .post(userController.postLoginUser)

portfolioRouter.route('/delete')
    .get(userController.deleteUser)

export default userRouter