import express from "express"
import PortfolioController from "../../controller/v1/PortfolioController"

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