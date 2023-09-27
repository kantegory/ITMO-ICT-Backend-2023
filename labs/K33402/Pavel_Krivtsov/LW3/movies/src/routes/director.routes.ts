import express from 'express'
import DirectorController from '../controllers/director.controller'

const router: express.Router = express.Router()

const controller = new DirectorController()

router.route('/:id').get(controller.get)

router.route('/').get(controller.getAll)

router.route('/').post(controller.create)

router.route('/:id').delete(controller.delete)

router.route('/:id').put(controller.update)

export default router
