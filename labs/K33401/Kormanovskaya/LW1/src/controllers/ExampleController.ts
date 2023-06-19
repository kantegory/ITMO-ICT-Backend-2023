import {Request, Response} from "express";
import ExampleService from "../services/ExampleEntity";

const exapmleEntityService = new ExampleService();

class ExampleEntityService {
    getAll = async (request: Request, response: Response) => {
        const allRandomEntities = await exapmleEntityService.getAll();
        return response.send(allRandomEntities);
    };

    create = async (request: Request, response: Response) => {
        const {value} = request.body;
        const results = await exapmleEntityService.create(value);
        return response.send(results);
    };

    update = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const {value} = request.body;
        const results = await exapmleEntityService.update(id, value);
        return response.send(results);
    };

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const results = await exapmleEntityService.delete(id);
        return response.send(results);
    };
}

export default ExampleEntityService;
