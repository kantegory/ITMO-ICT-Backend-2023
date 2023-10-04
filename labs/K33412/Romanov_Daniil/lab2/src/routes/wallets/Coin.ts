import express from 'express'
import CoinController from "../../controllers/wallets/Coin";

const router: express.Router = express.Router()

const coinController: CoinController = new CoinController()

router.route('/').get(coinController.getAll)
router.route('/:ticker').get(coinController.get)
router.route('/:ticker/price').get(coinController.getPrice)
router.route('/:ticker/candles').get(coinController.getCandles)

export default router