import express from "express"
import CoinController from "../../controller/v1/CoinController"

// Create router and controller
const coinRouter: express.Router = express.Router()
const coinController: CoinController = new CoinController()

// Portfolio routes
coinRouter.route('/list')
    .get(coinController.get_all)

coinRouter.route('/specific')
    .get(coinController.get)

coinRouter.route('/create_specific')
    .get(coinController.post)

coinRouter.route('/delete_specific')
    .get(coinController.delete)


export default coinRouter