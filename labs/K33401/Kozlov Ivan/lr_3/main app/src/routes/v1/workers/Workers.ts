import express from "express"
import WorlersController from "../../../controllers/workers/Workers"

const router: express.Router = express.Router()

const controller: WorlersController = new WorlersController()

router.route('/:id')
    .get(controller.get)
    .post(controller.create)
    .patch(controller.update)
    .delete(controller.delete)

export default router