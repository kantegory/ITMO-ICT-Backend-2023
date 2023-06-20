import {Request, Response} from "express";
import AuthorService from "../services/Author";

const authorService = new AuthorService();

class AuthorController {
    getAll = async (request: Request, response: Response) => {
        const allAuthors = await authorService.getAll();
        return response.send(allAuthors);
    };

    create = async (request: Request, response: Response) => {
        const {name} = request.body;
        const results = await authorService.create(name);
        return response.send(results);
    };

    update = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const {name} = request.body;
        const results = await authorService.update(id, name);
        return response.send(results);
    };

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const results = await authorService.delete(id);
        return response.send(results);
    };
}

export default AuthorController;