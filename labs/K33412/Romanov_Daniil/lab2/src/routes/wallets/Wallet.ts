import express from 'express'
import WalletController from "../../controllers/wallets/Wallet";
import passport from '../../middlewares/passport'

const router: express.Router = express.Router()

const walletController = new WalletController()

router.route('/').get(passport.authenticate('jwt', { session: false }), walletController.getAll)
router.route('/').post(passport.authenticate('jwt', { session: false }), walletController.create)
router.route('/:id').get(passport.authenticate('jwt', { session: false }), walletController.get)
router.route('/:id/increase').post(passport.authenticate('jwt', { session: false }), walletController.increase)
router.route('/:id/decrease').post(passport.authenticate('jwt', { session: false }), walletController.decrease)
router.route('/:id/buy_coin').post(passport.authenticate('jwt', { session: false }), walletController.buyCoin)
router.route('/:id/sell_coin').post(passport.authenticate('jwt', { session: false }), walletController.sellCoin)

export default router

