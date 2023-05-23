import express from "express"
import SellController from "../../../controllers/sells/Sell"
import passport from "../../../middleware/passport"

const router: express.Router = express.Router()

const controller: SellController = new SellController()

router.route('/')
    .post(passport.authenticate('bearer', { session: false }), controller.post)

router.route('/:id')
    .patch(passport.authenticate('bearer', { session: false }), controller.patch)

router.route("/earning")
    .get(passport.authenticate('bearer', { session: false }), controller.earning)

router.route('/')
    .get(passport.authenticate('bearer', { session: false }), controller.get)

router.route('/count')
    .get(passport.authenticate('bearer', { session: false }), controller.count)

export default router