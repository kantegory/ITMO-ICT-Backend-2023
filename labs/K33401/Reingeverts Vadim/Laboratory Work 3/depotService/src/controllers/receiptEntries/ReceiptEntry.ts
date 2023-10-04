import ReceiptEntryService from "~/services/receiptEntries/ReceiptEntry";
import CrudController from "~/controllers/CrudController";

class ReceiptEntryController extends CrudController {
    providerService = new ReceiptEntryService();
    readonly name = "ReceiptEntry";
}

export default ReceiptEntryController;
