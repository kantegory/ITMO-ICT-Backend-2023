import express from "express";

import SalesController from "~/controllers/sales/Sales";
import { isAuthenticated } from "~/middleware";

const salesRoutes = express.Router();
const controller = new SalesController();

salesRoutes.route("/").get(isAuthenticated, controller.getAll);

salesRoutes.route("/category/").get(isAuthenticated, controller.getCategories);

salesRoutes.route("/category/:category").get(isAuthenticated, controller.getByCategory);

salesRoutes.route("/products/:productId").get(isAuthenticated, controller.getByProduct);

export default salesRoutes;
