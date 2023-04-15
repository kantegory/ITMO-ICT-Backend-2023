import express from "express"
// import TestController from "../../controller/test/index"
import CoinController from "../../controller/v1/CoinController"
// import passport from "../../../middleware/passport"

// Test
// const router: express.Router = express.Router()
// const testController = new TestController()
//
// router.route('/test')
//     .get(testController.get)

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