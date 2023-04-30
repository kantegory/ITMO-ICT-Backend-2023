import express from "express";

import WarehouseController from "~/controllers/warehouses/Warehouse";
import { isAuthenticated } from "~/middleware";

const warehouseRoutes = express.Router();
const controller = new WarehouseController();

warehouseRoutes.route("/").get(isAuthenticated, controller.getAll);

warehouseRoutes.route("/").post(isAuthenticated, controller.post);

warehouseRoutes.route("/:id").get(isAuthenticated, controller.get);

warehouseRoutes.route("/:id").patch(isAuthenticated, controller.patch);

warehouseRoutes.route("/:id").delete(isAuthenticated, controller.delete);

export default warehouseRoutes;

// TODO
