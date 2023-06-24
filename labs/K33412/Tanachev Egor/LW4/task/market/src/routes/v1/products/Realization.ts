import express from "express"
import RealizationController from "../../../controllers/products/Realization"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: RealizationController = new RealizationController()

router.route('/')
    .post(controller.addRealization)

router.route('/amount')
    .get(controller.getSoldAmount)

router.route('/revenue')
    .get(controller.getSoldRevenue)

router.route('/stat/amount')
    .get(controller.getAmountStat)

router.route('/stat/revenue')
    .get(controller.getRevenueStat)

router.route('/realization')
    .get(controller.get)
    .post(controller.post)

router.route('/realization/:id')
    .get(controller.get)
    .delete(controller.delete)

export default router


