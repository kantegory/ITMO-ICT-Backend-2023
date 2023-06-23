import express from "express"
import CurrencyController from "../../../controllers/currency/Currency"

const router: express.Router = express.Router()

const controller: CurrencyController = new CurrencyController()

router.route('/')
    .get(controller.getAll)

router.route('/:id')
    .get(controller.get)

router.route('/:id')
    .put(controller.updateValue)

router.route('/create')
    .post(controller.post)

router.route('/filter/:filter')
    .get(controller.filter)


export default router
