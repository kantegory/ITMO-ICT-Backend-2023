import express from "express";

import ReceiptController from "~/controllers/receipts/Receipt";
import { isAuthenticated } from "~/middleware";

const receiptRoutes = express.Router();
const controller = new ReceiptController();

receiptRoutes.route("/").get(isAuthenticated, controller.getAll);

receiptRoutes.route("/").post(isAuthenticated, controller.post);

receiptRoutes.route("/:id").get(isAuthenticated, controller.get);

receiptRoutes.route("/:id").patch(isAuthenticated, controller.patch);

receiptRoutes.route("/:id").delete(isAuthenticated, controller.delete);

export default receiptRoutes;
