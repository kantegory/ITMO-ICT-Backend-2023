import express from 'express'
import UserController from '../../../controllers/users/User'

const router: express.Router = express.Router()

const controller: UserController = new UserController()

router.route('/:id')
    .get(controller.get)

router.route('/')
    .post(controller.post)

router.route('/:id')
    .get(controller.put)

export default router
