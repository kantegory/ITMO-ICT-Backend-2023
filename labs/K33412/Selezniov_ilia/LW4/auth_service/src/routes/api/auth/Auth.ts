import express from 'express'
import UserController from '../../../controllers/users/User'

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/login')
    .post(controller.login)

router.route('/refresh')
    .post(controller.refreshToken)

router.route('/validate')
    .post(controller.validateToken)

export default router