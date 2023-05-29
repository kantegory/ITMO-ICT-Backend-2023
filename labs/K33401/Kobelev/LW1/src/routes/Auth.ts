import express from 'express'
import AuthController from '../controllers/AuthController'
import { checkJWT } from '../middlewares/checkJWT'

const router: express.Router = express.Router()

const authController = new AuthController()

router.route('/login').post(authController.login)

router.route('/signup').post(authController.signup)

router.route('/me').get(checkJWT, authController.me)

export default router
