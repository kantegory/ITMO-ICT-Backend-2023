import express from "express";
import ChartController from "../../../controllers/chart/ChartController";

const router: express.Router = express.Router();

const controller: ChartController = new ChartController();

router.route('/')
    .get(controller.getChartData)

export default router;