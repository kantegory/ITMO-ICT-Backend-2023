import express from "express"
import UserController from "../controllers/user.controller"
import passport from "../middlewares/passport"

const userRoutes: express.Router = express.Router()
const controller: UserController = new UserController()

userRoutes.route('/').post(controller.post)
userRoutes.route('/profile').get(passport.authenticate('jwt', {session: false}), controller.me)
userRoutes.route('/register/:id').post(passport.authenticate('jwt', {session: false}), controller.register)
userRoutes.route('/register/:id').delete(passport.authenticate('jwt', {session: false}), controller.unregister)
userRoutes.route('/login').post(controller.auth)

export default userRoutes