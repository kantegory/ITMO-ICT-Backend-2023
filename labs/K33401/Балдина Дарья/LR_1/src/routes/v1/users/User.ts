import express from "express"
import UserController from "../../../controllers/users/User"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/reg')
    .post(controller.post)

router.route('/account')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/account/:id')
    .get(controller.get)

router.route('/login')
    .post(controller.auth)

router.route('/refresh')
    .post(controller.refreshToken)

router.route('/accounts')
    .get(controller.getAll)

router.route('/accounts/:username')
    .get(controller.getByUsername)

export default router
