import express from "express";

import ProductController from "~/controllers/products/Product";
import { isAuthenticated } from "~/middleware";

const productRoutes = express.Router();
const controller = new ProductController();

productRoutes.route("/").get(isAuthenticated, controller.getAll);

productRoutes.route("/").post(isAuthenticated, controller.post);

productRoutes.route("/:id").get(isAuthenticated, controller.get);

productRoutes.route("/:id").patch(isAuthenticated, controller.patch);

productRoutes.route("/:id").delete(isAuthenticated, controller.delete);

export default productRoutes;
