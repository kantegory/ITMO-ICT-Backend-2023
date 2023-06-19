import express from 'express'
import WalletController from '../../../controllers/wallet/Wallet'
import passport from '../../../middlewares/passport'

const router: express.Router = express.Router()

const controller = new WalletController()

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), controller.post)

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), controller.getAll)

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), controller.get)

router.route('/:id/add_money')
    .post(passport.authenticate('jwt', {session: false}), controller.increaseBalance)

router.route('/:id/withdraw_money')
    .post(passport.authenticate('jwt', {session: false}), controller.decreaseBalance)

router.route('/:id/buy_coin')
    .post(passport.authenticate('jwt', {session: false}), controller.buyCoin)

router.route('/:id/sell_coin')
    .post(passport.authenticate('jwt', {session: false}), controller.sellCoin)

router.route('/:id/sell_all_coin')
    .post(passport.authenticate('jwt', {session: false}), controller.sellAllCoin)

export default router
