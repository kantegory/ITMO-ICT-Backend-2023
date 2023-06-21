import express from "express";
import DealController from "../../../controllers/deals/Deal";

const router: express.Router = express.Router();

const controller: DealController = new DealController();

router.route("/").post(controller.post);
router.route("/").get(controller.getAll);;
router.route('/revenue').get(controller.revenue);
router.route("/:id").get(controller.get);

export default router;
