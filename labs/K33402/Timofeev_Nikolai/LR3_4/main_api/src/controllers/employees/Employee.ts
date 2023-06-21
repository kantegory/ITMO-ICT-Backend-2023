import axios from "axios";

class EmployeeController {

  get = async (request: any, response: any) => {
    try {
      const url = `http://empl_api:5001/api/v1/employees/${Number(request.params.id)}`;
      const resp = await axios.get(url);
      response.send(resp.data);
    } catch (error: any) {
      console.error('Error:', error.message);
      response.status(404).send({ error: error.message });
    }
  };
  

  post = async (request: any, response: any) => {
    const { body } = request;
    try {
      const url = `http://empl_api:5001/api/v1/employees/`;
      const resp = await axios.post(url, body);
      response.send(resp.data);
    } catch (error: any) {
      response.status(404).send({ error: error.message });
    }
  };

  getAll = async (request: any, response: any) => {
    try {
      const url = `http://empl_api:5001/api/v1/employees/`;
      const resp = await axios.get(url);
      response.send(resp.data);
    } catch (error: any) {
      response.status(500).send({ error: error });
    }
  };

  changeStatus = async (request: any, response: any) => {
    try {
        const id = request.params.id
        const url = `http://empl_api:5001/api/v1/employees/${Number(id)}`;
        const resp = await axios.delete(url);
        response.send(resp.data);
    } catch (error: any) {
        response.status(502).send({ error: error.message });
    }
  }
}

export default EmployeeController;
