import express from "express"
// import TestController from "../../controller/test/index"
import UserController from "../../controller/v1/UserController"
import portfolioRouter from "./PortfolioRouter";
// import passport from "../../../middleware/passport"

// Test
// const router: express.Router = express.Router()
// const testController = new TestController()
//
// router.route('/test')
//     .get(testController.get)

// Create router and controller
const userRouter: express.Router = express.Router()
const userController: UserController = new UserController()

// User routes
userRouter.route('/list')
    .get(userController.getAll)

userRouter.route('/specific')
    .get(userController.getUser)

userRouter.route('/registration')
    .post(userController.postCreateUser)

userRouter.route('/login')
    .get(userController.postLoginUser)

portfolioRouter.route('/delete')
    .get(userController.deleteUser)

export default userRouter