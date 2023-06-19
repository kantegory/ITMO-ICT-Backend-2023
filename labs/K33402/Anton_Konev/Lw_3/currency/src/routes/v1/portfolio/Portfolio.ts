import express from "express";
import PortfolioController from "../../../controllers/portfolio/PortfolioController";
import passport from "../../../middlewares/passport";

const router: express.Router = express.Router();

const controller: PortfolioController = new PortfolioController();

router.route('/:id')
    .get(passport.authenticate('bearer', { session: false }),controller.findByUserId)

router.route('/buy')
    .post(passport.authenticate('bearer', { session: false }),controller.buyCurrency)

router.route('/sell')
    .post(passport.authenticate('bearer', { session: false }),controller.sellCurrency)

export default router;