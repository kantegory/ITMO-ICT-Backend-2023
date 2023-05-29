import express from "express"
import UserController from "../../../controllers/users/User"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.post('/', controller.create)
router.get('/profile', passport.authenticate('jwt', { session: false }), controller.me)
router.get('/:id', controller.get)
router.post('/login', controller.auth)
router.post('/refresh', controller.refreshToken)

export default router