import express from "express";

import WarehouseController from "~/controllers/warehouses/Warehouse";

const warehouseRoutes = express.Router();
const controller = new WarehouseController();

warehouseRoutes.route("/").get(controller.getAll);

warehouseRoutes.route("/").post(controller.post);

warehouseRoutes.route("/:id").get(controller.get);

warehouseRoutes.route("/:id").patch(controller.patch);

warehouseRoutes.route("/:id").delete(controller.delete);

export default warehouseRoutes;
