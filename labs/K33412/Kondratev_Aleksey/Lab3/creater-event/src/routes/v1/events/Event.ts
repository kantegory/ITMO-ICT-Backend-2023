import express from "express"
import EventController from "../../../controllers/events/Event"

const router: express.Router = express.Router()

const controller: EventController = new EventController()

router.get('/:id', controller.get)
router.post('/', controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)
router.post('/filter', controller.getByParams)

export default router
