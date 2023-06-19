import express from "express"
import { UserController } from "../../controllers/users/User"
import passport from "../../middlewares/passport"

const userRoutes: express.Router = express.Router()
const controller: UserController = new UserController()

userRoutes.route('/signup')
    .post(controller.signup)

userRoutes.route('/login')
    .post(controller.login)

userRoutes.route('/profile')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

userRoutes.route('/profile/:id')
    .get(controller.getUser)

export default userRoutes