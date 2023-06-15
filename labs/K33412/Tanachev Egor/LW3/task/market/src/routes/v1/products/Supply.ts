import express from "express"
import SupplyController from "../../../controllers/products/Supply"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: SupplyController = new SupplyController()

router.route('/amount')
    .get(passport.authenticate('bearer', { session: false }), controller.getSuppliedProductAmount)

router.route('/supply')
    .get(passport.authenticate('bearer', { session: false }), controller.get)
    .post(passport.authenticate('bearer', { session: false }), controller.post)

router.route('/supply/:id')
    .get(passport.authenticate('bearer', { session: false }), controller.get)
    .delete(passport.authenticate('bearer', { session: false }), controller.delete)

export default router

