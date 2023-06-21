import express from "express";
import WarehouseController from "../../../controllers/warehouses/Warehouse";

const router: express.Router = express.Router();

const controller: WarehouseController = new WarehouseController();

router.route("/").post(controller.post);
router.route("/").get(controller.getAll);
router.route("/:id").get(controller.get);

export default router;
