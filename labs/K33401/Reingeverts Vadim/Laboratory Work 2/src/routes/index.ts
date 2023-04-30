import express from "express";

import userRoutes from "~/routes/users/User";
import productRoutes from "~/routes/products/Product";
import stockRoutes from "~/routes/stocks/Stock";
import warehouseRoutes from "~/routes/warehouses/Warehouse";

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/stocks", stockRoutes);
routes.use("/warehouses", warehouseRoutes);

export default routes;
