import express from "express"
import PortfolioController from "../controller/PortfolioController"

// Create router and controller
const portfolioRouter: express.Router = express.Router()
const portfolioController: PortfolioController = new PortfolioController()

// Portfolio routes
portfolioRouter.route('/all')
    .get(portfolioController.getAllPortfolios)

portfolioRouter.route('/user')
    .get(portfolioController.getAllPortfoliosByUser)

portfolioRouter.route('/specific')
    .get(portfolioController.getPortfolio)

portfolioRouter.route('/delete')
    .delete(portfolioController.deletePortfolio)

export default portfolioRouter