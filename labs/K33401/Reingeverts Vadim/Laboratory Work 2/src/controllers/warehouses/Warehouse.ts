import WarehouseService from "~/services/warehouses/Warehouse";
import CrudController from "~/controllers/CrudController";

class WarehouseController extends CrudController {
    providerService = new WarehouseService();
    readonly name = "Warehouse";
}

export default WarehouseController;
