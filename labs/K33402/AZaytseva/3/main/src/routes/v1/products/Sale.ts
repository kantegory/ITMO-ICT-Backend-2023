import express from "express"
import SaleController from "../../../controllers/products/Sale"

const router: express.Router = express.Router()

const controller: SaleController = new SaleController()

router.route('/')
    .post(controller.addSale)

router.route('/amount')
    .get(controller.getSoldAmount)

router.route('/revenue')
    .get(controller.getSoldRevenue)

router.route('/sale')
    .get(controller.get)
    .post(controller.post)

router.route('/sale/:id')
    .get(controller.get)
    .delete(controller.delete)

export default router