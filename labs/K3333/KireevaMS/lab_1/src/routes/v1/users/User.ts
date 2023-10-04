import express from "express"
import UserController from "../../../controllers/users/User"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/create_account')
    .post(controller.post)

router.route('/auth')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/account/:id')
    .get(controller.get)

router.route('/login')
    .post(controller.auth)

router.route('/refresh')
    .post(controller.refreshToken)

router.route('/profiles')
    .get(controller.getAll)

router.route('/delete/:id')
    .delete(controller.deleteById)

export default router
