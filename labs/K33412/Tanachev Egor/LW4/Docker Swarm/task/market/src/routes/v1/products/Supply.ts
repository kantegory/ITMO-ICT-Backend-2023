import express from "express"
import SupplyController from "../../../controllers/products/Supply"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: SupplyController = new SupplyController()

router.route('/amount')
    .get(controller.getSuppliedProductAmount)

router.route('/supply')
    .get(controller.get)
    .post(controller.post)

router.route('/supply/:id')
    .get(controller.get)
    .delete(controller.delete)

export default router

