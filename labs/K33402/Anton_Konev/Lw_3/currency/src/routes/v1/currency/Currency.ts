import express from "express";
import CurrencyController from "../../../controllers/currency/CurrencyController";
import passport from "../../../middlewares/passport";

const router: express.Router = express.Router();

const controller: CurrencyController = new CurrencyController();

router.route('/load')
    .get(passport.authenticate('bearer', { session: false }),controller.loadAll)

router.route('/')
    .get(passport.authenticate('bearer', { session: false }),controller.getAll)

// router.route('/:id')
//     .get(controller.getById)

router.route('/name')
    .get(passport.authenticate('bearer', { session: false }),controller.getByName)

router.route('/date_filter')
    .get(passport.authenticate('bearer', { session: false }),controller.filterByDate)

export default router;