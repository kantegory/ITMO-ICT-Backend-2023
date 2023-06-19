import express from "express";

import ReceiptController from "~/controllers/receipts/Receipt";

const receiptRoutes = express.Router();
const controller = new ReceiptController();

receiptRoutes.route("/").get(controller.getAll);

receiptRoutes.route("/").post(controller.post);

receiptRoutes.route("/:id").get(controller.get);

receiptRoutes.route("/:id").patch(controller.patch);

receiptRoutes.route("/:id").delete(controller.delete);

export default receiptRoutes;
