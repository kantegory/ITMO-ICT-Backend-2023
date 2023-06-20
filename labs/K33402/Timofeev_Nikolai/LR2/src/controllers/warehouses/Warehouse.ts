import Warehouse from "../../models/warehouses/Warehouse";
import WarehouseService from "../../services/warehouses/Warehouse";

class WarehouseController {
  private _service: WarehouseService;

  constructor() {
    this._service = new WarehouseService();
  }

  get = async (request: any, response: any) => {
    try {
      const warehouse: Warehouse = await this._service.getById(Number(request.params.id));
      response.send(warehouse);
    } catch (error: any) {
      response.status(404).send({ error: error.message });
    }
  };

  post = async (request: any, response: any) => {
    const { body } = request;

    try {
      const user: Warehouse = await this._service.create(body);
      response.status(201).send(user);
    } catch (error: any) {
      response.status(400).send({ error: error.message });
    }
  };

  getAll = async (request: any, response: any) => {
    try {
      response.send(await this._service.getAll());
    } catch (error: any) {
      response.status(500).send({ error: error.message });
    }
  };
}

export default WarehouseController;
