import express from "express"
import PlotController from "../../../controllers/plot/Plot";
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: PlotController = new PlotController()

//График за год
router.route('/year')
    .get(passport.authenticate('bearer', { session: false }), controller.oneYear)

//График за месяц
router.route('/month')
    .get(passport.authenticate('bearer', { session: false }), controller.oneMonth)

export default router
