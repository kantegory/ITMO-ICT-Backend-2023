import express from "express"
// import TestController from "../../controller/test/index"
import UserController from "../../controller/v1/UserController"
import portfolioRouter from "./Portfolio";
// import passport from "../../../middleware/passport"

// Test
// const router: express.Router = express.Router()
// const testController = new TestController()
//
// router.route('/test')
//     .get(testController.get)

// Create router and controller
const userRoutes: express.Router = express.Router()
const userController: UserController = new UserController()

// User routes
userRoutes.route('/list')
    .get(userController.get_all)

userRoutes.route('/specific')
    .get(userController.get)

userRoutes.route('/registration')
    .get(userController.post_create_user)

userRoutes.route('/login')
    .get(userController.post_login_user)

portfolioRouter.route('/delete')
    .get(userController.delete)

export default userRoutes