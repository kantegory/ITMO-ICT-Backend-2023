import express from "express"
import UserController from "../../controller/v1/UserController"

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

userRouter.route('/update')
    .post(userController.updateUser)

userRouter.route('/delete')
    .get(userController.deleteUser)

export default userRouter