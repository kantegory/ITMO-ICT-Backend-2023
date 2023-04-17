import express from "express"
// import TestController from "../../controller/test/index"
import PortfolioController from "../../controller/v1/PortfolioController"
// import passport from "../../../middleware/passport"

// Test
// const router: express.Router = express.Router()
// const testController = new TestController()
//
// router.route('/test')
//     .get(testController.get)

// Create router and controller
const portfolioRouter: express.Router = express.Router()
const portfolioController: PortfolioController = new PortfolioController()

// Portfolio routes
portfolioRouter.route('/list')
    .get(portfolioController.get_all)

portfolioRouter.route('/specific')
    .get(portfolioController.get)

portfolioRouter.route('/add_coin')
    .get(portfolioController.post)

portfolioRouter.route('/delete_coin')
    .get(portfolioController.delete)


export default portfolioRouter