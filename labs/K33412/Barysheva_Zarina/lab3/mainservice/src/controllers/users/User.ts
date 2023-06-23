import axios from "axios"
import { log } from "console";
import jwt from 'jsonwebtoken'


class UserController {
    get = async (request: any, response: any) => {
        try {
          const url = `http://localhost:8101/v1/users/profile/${Number(request.params.userId)}`;
          const resp = await axios.get(url);
          response.send(resp.data);
        } catch (e: any) {
          console.error('Error:', e.message);
          response.status(404).send({ error: e.message });
        }
      };


    post = async (request: any, response: any) => {
        const { body } = request;
        try {
          const url = `http://localhost:8101/v1/users/`;
          const resp = await axios.post(url, body);
          response.send(resp.data);
        } catch (error: any) {
          response.status(404).send({ error: error.message });
        }
      };

    me = async (request: any, response: any) => {
        const body = request.headers;
        console.log(body);
        
        try {
          const url = `http://localhost:8101/v1/users/profile/`;
          const resp = await axios.get(url, {headers: body});
          
          response.send(resp.data);
        } catch (e: any) {
          console.error('Error:', e.message);
          response.status(404).send({ error: e.message });
        }
      };

    auth = async (request: any, response: any) => {
        const { body } = request;
        try {
          const url = `http://localhost:8101/v1/users/login`;
          const resp = await axios.post(url, body);
          response.send(resp.data);
        } catch (error: any) {
          response.status(404).send({ error: error.message });
        }
      };

}

export default UserController
