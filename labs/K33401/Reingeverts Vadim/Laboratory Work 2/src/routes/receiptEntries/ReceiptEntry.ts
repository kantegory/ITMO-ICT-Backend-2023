import express from "express";

import ReceiptEntryController from "~/controllers/receiptEntries/ReceiptEntry";
import { isAuthenticated } from "~/middleware";

const receiptEntriyRoutes = express.Router();
const controller = new ReceiptEntryController();

receiptEntriyRoutes.route("/").get(isAuthenticated, controller.getAll);

receiptEntriyRoutes.route("/").post(isAuthenticated, controller.post);

receiptEntriyRoutes.route("/:id").get(isAuthenticated, controller.get);

receiptEntriyRoutes.route("/:id").patch(isAuthenticated, controller.patch);

receiptEntriyRoutes.route("/:id").delete(isAuthenticated, controller.delete);

export default receiptEntriyRoutes;
