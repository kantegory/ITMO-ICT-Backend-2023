import axios from 'axios';

class GoodsController {
  redirect = async (request: any, response: any) => {
    try {
      const redirectedResponse = await axios.request({
        method: request.method,
        url: `http://localhost:9091${request.originalUrl}`,
        data: request.body,
      });

      response.send(redirectedResponse.data);
    } catch (error: any) {
      response.status(404).send({ error: `error` });
    }
  };
}

export default GoodsController;
