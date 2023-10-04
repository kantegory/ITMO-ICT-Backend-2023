import express from "express";

import userRoutes from "~/routes/users/User";
import productRoutes from "~/routes/products/Product";
import stockRoutes from "~/routes/stocks/Stock";
import warehouseRoutes from "~/routes/warehouses/Warehouse";
import receiptRoutes from "~/routes/receipts/Receipt";
import receiptEntriyRoutes from "~/routes/receiptEntries/ReceiptEntry";
import salesRoutes from "~/routes/sales/Sales";

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/stocks", stockRoutes);
routes.use("/warehouses", warehouseRoutes);
routes.use("/receipts", receiptRoutes);
routes.use("/receiptEntries", receiptEntriyRoutes);
routes.use("/sales", salesRoutes);

export default routes;
