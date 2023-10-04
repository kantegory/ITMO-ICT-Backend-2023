import express from "express";

import ReceiptEntryController from "~/controllers/receiptEntries/ReceiptEntry";

const receiptEntriyRoutes = express.Router();
const controller = new ReceiptEntryController();

receiptEntriyRoutes.route("/").get(controller.getAll);

receiptEntriyRoutes.route("/").post(controller.post);

receiptEntriyRoutes.route("/:id").get(controller.get);

receiptEntriyRoutes.route("/:id").patch(controller.patch);

receiptEntriyRoutes.route("/:id").delete(controller.delete);

export default receiptEntriyRoutes;
