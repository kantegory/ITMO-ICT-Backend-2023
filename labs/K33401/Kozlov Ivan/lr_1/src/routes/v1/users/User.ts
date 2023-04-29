import express from "express"
import UserController from "../../../controllers/users/User"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/').post(controller.post)

router.route('/h').get(controller.hello)

router.route('/profile').get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/profile/:id').get(controller.get)

router.route('/login').post(controller.auth)

router.route('/refresh').post(controller.refreshToken)

router.route('/create').post(controller.create)

export default router