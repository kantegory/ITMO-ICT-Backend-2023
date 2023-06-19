import express from "express";
import CurrencyController from "../../../controllers/currency/CurrencyController";

const router: express.Router = express.Router();

const controller: CurrencyController = new CurrencyController();

router.route('/load')
    .get(controller.loadAll)

router.route('/')
    .get(controller.getAll)

// router.route('/:id')
//     .get(controller.getById)

router.route('/name')
    .get(controller.getByName)

router.route('/date_filter')
    .get(controller.filterByDate)

export default router;