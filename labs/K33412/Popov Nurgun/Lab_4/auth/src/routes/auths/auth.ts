import express from "express"
import { UserController } from "../../controllers/auth"
import passport from "../../middlewares/passport"

const routes: express.Router = express.Router()

const controller: UserController = new UserController()

routes.route('/signup')
    .post(controller.signup)

routes.route('/login')
    .post(controller.login)

routes.route('/profile')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

routes.route('/accessToken')
    .post(controller.accessToken)

routes.route('/:id')
    .get(controller.get)

export default routes