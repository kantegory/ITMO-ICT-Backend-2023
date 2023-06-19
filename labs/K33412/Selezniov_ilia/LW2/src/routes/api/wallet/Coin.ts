import express from 'express'
import CoinController from '../../../controllers/wallet/Coin'

const router: express.Router = express.Router()

const controller = new CoinController()

router.route('/')
    .get(controller.getAll)

router.route('/:ticker')
    .get(controller.get)

router.route('/:ticker/price')
    .get(controller.price)

router.route('/:ticker/candles')
    .get(controller.candles)

export default router
