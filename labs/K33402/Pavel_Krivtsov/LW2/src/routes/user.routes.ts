import express from 'express'
import UserController from '../controllers/user.controller'
import {checkJWT} from '../middlewares/checkJWT'

const router: express.Router = express.Router()

const controller = new UserController()

router.route('/').get(controller.getAll)

router.route('/login').post(controller.login)

router.route('/signup').post(controller.signup)

router.route('/me').get(checkJWT, controller.me)

export default router
