import express from "express"
import WorlersController from "../../../controllers/workers/Workers"

const router: express.Router = express.Router()

const controller: WorlersController = new WorlersController()

router.route('/get/:id').get(controller.get)

router.route('/create').post(controller.create)

router.route('/update/:id').post(controller.update)

router.route('/delete/:id').post(controller.delete)

export default router