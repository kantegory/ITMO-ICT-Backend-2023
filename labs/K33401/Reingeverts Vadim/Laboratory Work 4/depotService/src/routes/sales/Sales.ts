import express from "express";

import SalesController from "~/controllers/sales/Sales";

const salesRoutes = express.Router();
const controller = new SalesController();

salesRoutes.route("/").get(controller.getAll);

salesRoutes.route("/category/").get(controller.getCategories);

salesRoutes.route("/category/:category").get(controller.getByCategory);

salesRoutes.route("/products/:productId").get(controller.getByProduct);

export default salesRoutes;
