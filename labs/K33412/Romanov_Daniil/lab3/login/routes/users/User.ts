import express from 'express'
import UserController from "../../controllers/User";
import passport from '../../middlewares/passport'

const router: express.Router = express.Router()

const userController: UserController = new UserController()

router.route('/').post(userController.create)
router.route('/profile').get(passport.authenticate('jwt', { session: false }), userController.me)
router.route('/profile/:id').get(userController.get)
router.route('/login').post(userController.auth)
router.route('/accessToken').post(userController.accessToken)

export default router