import express from "express";

import StockController from "~/controllers/stocks/Stock";

const stockRoutes = express.Router();
const controller = new StockController();

stockRoutes.route("/").get(controller.getAll);

stockRoutes.route("/").post(controller.post);

stockRoutes.route("/:id").get(controller.get);

stockRoutes.route("/:id").patch(controller.patch);

stockRoutes.route("/:id").delete(controller.delete);

export default stockRoutes;
