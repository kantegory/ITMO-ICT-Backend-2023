import ReceiptService from "~/services/receipts/Receipt";
import CrudController from "~/controllers/CrudController";

class ReceiptController extends CrudController {
    providerService = new ReceiptService();
    readonly name = "Receipt";
}

export default ReceiptController;
