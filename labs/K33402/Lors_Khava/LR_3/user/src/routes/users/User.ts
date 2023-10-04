import express from "express"
import UserController from "../../controllers/users/User"
import passport from "../../middlewares/passport"

const router: express.Router = express.Router()
const controller: UserController = new UserController()

router.route('/signup')
    .post(controller.post)

router.route('/login')
    .post(controller.auth)

router.route('/profile')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/profile/:id')
    .get(controller.get)

router.route('/refresh')
    .post(controller.refreshToken)

router.route('/:id')
    .put(passport.authenticate('jwt', { session: false }), controller.update)

router.route('/:id')
    .delete(passport.authenticate('jwt', { session: false }), controller.delete)

router.route('/validateToken')
    .post(controller.validateToken)

export default router