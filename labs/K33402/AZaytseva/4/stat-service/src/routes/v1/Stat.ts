import express from "express"
import StatController from "../../controllers/Stat"

const router: express.Router = express.Router()

const controller: StatController = new StatController()

router.route('/amount')
    .get(controller.getAmountStat)
router.route('/revenue')
    .get(controller.getRevenueStat)

export default router