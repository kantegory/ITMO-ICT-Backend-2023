import express from "express"
import SellController from "../../../controllers/sells/Sell"


const router: express.Router = express.Router()

const controller: SellController = new SellController()

router.route('/')
    .post(controller.post)

router.route('/:id')
    .patch(controller.patch)

router.route("/earning")
    .get(controller.earning)

router.route('/')
    .get(controller.get)

router.route('/count')
    .get(controller.count)

export default router