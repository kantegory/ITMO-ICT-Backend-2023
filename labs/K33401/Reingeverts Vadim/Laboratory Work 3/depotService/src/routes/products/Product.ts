import express from "express";

import ProductController from "~/controllers/products/Product";

const productRoutes = express.Router();
const controller = new ProductController();

productRoutes.route("/").get(controller.getAll);

productRoutes.route("/").post(controller.post);

productRoutes.route("/:id").get(controller.get);

productRoutes.route("/:id").patch(controller.patch);

productRoutes.route("/:id").delete(controller.delete);

export default productRoutes;
