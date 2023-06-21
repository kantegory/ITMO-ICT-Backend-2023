import Employee from "../models/employees/Employee";
import EmployeeService from "../services/Employee";

class EmployeeController {
  private _service: EmployeeService;

  constructor() {
    this._service = new EmployeeService();
  }

  get = async (request: any, response: any) => {
    try {
      const employee: Employee = await this._service.getById(Number(request.params.id));
      response.send(employee);
    } catch (error: any) {
      response.status(404).send({ error: error.message });
    }
  };

  post = async (request: any, response: any) => {
    const { body } = request;

    try {
      const user: Employee = await this._service.create(body);
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

  changeStatus = async (request: any, response: any) => {
    try {
        const id = request.params.id
        response.send(await this._service.changeStatus(Number(id)))
    } catch (error: any) {
        response.status(502).send({ error: error.message });
    }
  }
}

export default EmployeeController;