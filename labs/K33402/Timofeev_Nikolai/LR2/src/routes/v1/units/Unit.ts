import express from "express";
import UnitController from "../../../controllers/units/Unit";

const router: express.Router = express.Router();

const controller: UnitController = new UnitController();

router.route("/").post(controller.post);
router.route("/").get(controller.getAll);
router.route("/:id").get(controller.get);

export default router;
