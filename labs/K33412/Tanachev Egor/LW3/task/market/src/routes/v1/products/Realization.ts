import express from "express"
import RealizationController from "../../../controllers/products/Realization"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: RealizationController = new RealizationController()

router.route('/')
    .post(passport.authenticate('bearer', { session: false }), controller.addRealization)

router.route('/amount')
    .get(passport.authenticate('bearer', { session: false }), controller.getSoldAmount)

router.route('/revenue')
    .get(passport.authenticate('bearer', { session: false }), controller.getSoldRevenue)

router.route('/stat/amount')
    .get(passport.authenticate('bearer', { session: false }), controller.getAmountStat)

router.route('/stat/revenue')
    .get(passport.authenticate('bearer', { session: false }), controller.getRevenueStat)

router.route('/realization')
    .get(passport.authenticate('bearer', { session: false }), controller.get)
    .post(passport.authenticate('bearer', { session: false }), controller.post)

router.route('/realization/:id')
    .get(passport.authenticate('bearer', { session: false }), controller.get)
    .delete(passport.authenticate('bearer', { session: false }), controller.delete)

export default router


