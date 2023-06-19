import express from "express";
import PortfolioController from "../../../controllers/portfolio/PortfolioController";

const router: express.Router = express.Router();

const controller: PortfolioController = new PortfolioController();

router.route('/:id')
    .get(controller.findByUserId)

router.route('/buy')
    .post(controller.buyCurrency)

router.route('/sell')
    .post(controller.sellCurrency)

export default router;