import StockService from "~/services/stocks/Stock";
import CrudController from "~/controllers/CrudController";

class StockController extends CrudController {
    providerService = new StockService();
    readonly name = "Stock";
}

export default StockController;
