import Unit from "../../models/units/Unit";
import UnitService from "../../services/units/Unit";

class UnitController {
  private _service: UnitService;

  constructor() {
    this._service = new UnitService();
  }

  get = async (request: any, response: any) => {
    try {
      const employee: Unit = await this._service.getById(Number(request.params.id));
      response.send(employee);
    } catch (error: any) {
      response.status(404).send({ error: error.message });
    }
  };

  post = async (request: any, response: any) => {
    const { body } = request;

    try {
      const unit: Unit = await this._service.create(body);
      response.status(201).send(unit);
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

export default UnitController;
