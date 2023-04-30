import express from "express";

import StockController from "~/controllers/stocks/Stock";
import { isAuthenticated } from "~/middleware";

const stockRoutes = express.Router();
const controller = new StockController();

stockRoutes.route("/").get(isAuthenticated, controller.getAll);

stockRoutes.route("/").post(isAuthenticated, controller.post);

stockRoutes.route("/:id").get(isAuthenticated, controller.get);

stockRoutes.route("/:id").patch(isAuthenticated, controller.patch);

stockRoutes.route("/:id").delete(isAuthenticated, controller.delete);

export default stockRoutes;

// TODO
