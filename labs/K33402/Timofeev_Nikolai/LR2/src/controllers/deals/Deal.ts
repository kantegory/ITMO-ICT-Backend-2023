import Deal from "../../models/deal/Deal";
import DealService from "../../services/deals/Deal";

class DealController {
  private _service: DealService;

  constructor() {
    this._service = new DealService();
  }

  get = async (request: any, response: any) => {
    try {
      const deal: Deal = await this._service.getById(Number(request.params.id));
      response.send(deal);
    } catch (error: any) {
      response.status(404).send({ error: error.message });
    }
  };

  post = async (request: any, response: any) => {
    const { body } = request;

    try {
      const unit: Deal = await this._service.create(body);
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

  revenue = async (request: any, response: any) => {
    try {
      response.send(await this._service.totalRevenue());
    } catch (error: any) {
      response.status(500).send({ error: error.message });
    }
  };
}

export default DealController;
