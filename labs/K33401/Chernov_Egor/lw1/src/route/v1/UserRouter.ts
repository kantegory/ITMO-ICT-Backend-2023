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
    .get(userController.get_all)

userRouter.route('/specific')
    .get(userController.get)

userRouter.route('/registration')
    .get(userController.post_create_user)

userRouter.route('/login')
    .get(userController.post_login_user)

portfolioRouter.route('/delete')
    .get(userController.delete)

export default userRouter