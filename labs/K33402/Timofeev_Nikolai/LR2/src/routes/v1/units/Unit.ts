import express from "express";
import UnitController from "../../../controllers/units/Unit";

const router: express.Router = express.Router();

const controller: UnitController = new UnitController();

router.route("/").post(controller.post);
router.route("/").get(controller.getAll);
router.route("/analytics").get(controller.stockGraph);
router.route("/:id").get(controller.get);
router.route('/search/:query').get(controller.search);

export default router;
