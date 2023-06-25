import express from "express"
import UserController from "../controllers/user"
import passport from "../middlewares/passport"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/signup')
    .post(controller.post)

router.route('/me')
    .get(passport.authenticate('jwt', { session: false }), controller.me)

router.route('/:id')
    .get(controller.get)

router.route('/login')
    .post(controller.auth)

router.route('/refresh')
    .post(controller.refreshToken)

router.route('/')
    .get(controller.getAll)

router.route('/email/:email')
    .get(controller.getByEmail)

router.route('/myevents/:id')
    .get(controller.getEvents)

export default router