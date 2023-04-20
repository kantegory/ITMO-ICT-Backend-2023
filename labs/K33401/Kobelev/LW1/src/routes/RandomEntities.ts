import express from 'express'
import RandomEntityController from '../controllers/RandomEntityController'
const router: express.Router = express.Router()

const randomEntityController = new RandomEntityController()

router.route('/').get(randomEntityController.getAllRandomEntities)

router.route('/').post(randomEntityController.createRandomEntity)

router.route('/:id').delete(randomEntityController.deleteRandomEntity)

router.route('/:id').put(randomEntityController.updateRandomEntity)

export default router
