import express from "express"
import UserController from "../controllers/user.controller"
import passport from "../middlewares/passport"

const userRoutes: express.Router = express.Router()
const controller: UserController = new UserController()

userRoutes.route('/').post(controller.post)
userRoutes.route('/profile').get(passport.authenticate('jwt', {session: false}), controller.me)
userRoutes.route('/login').post(controller.auth)
userRoutes.route('/refresh').post(controller.refreshToken)

export default userRoutes