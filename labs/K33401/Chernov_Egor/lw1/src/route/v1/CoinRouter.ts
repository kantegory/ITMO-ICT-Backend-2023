import express from "express"
import CoinController from "../../controller/v1/CoinController"

// Create router and controller
const coinRouter: express.Router = express.Router()
const coinController: CoinController = new CoinController()

// Portfolio routes
coinRouter.route('/list')
    .get(coinController.getAllCoins)

coinRouter.route('/specific')
    .get(coinController.getCoin)

coinRouter.route('/add')
    .post(coinController.addCoin)

coinRouter.route('/create')
    .post(coinController.createCoin)

coinRouter.route('/update')
    .post(coinController.updateCoin)

coinRouter.route('/delete')
    .delete(coinController.deleteCoin)


export default coinRouter