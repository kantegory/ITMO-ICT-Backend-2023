import express from "express";
import ChartController from "../../../controllers/chart/ChartController";
import passport from "../../../middlewares/passport";

const router: express.Router = express.Router();

const controller: ChartController = new ChartController();

router.route('/')
    .get(passport.authenticate('bearer', { session: false }),controller.getChartData)

export default router;