import {Request, Response} from "express";
import GenreService from "../services/Genre";

const genreService = new GenreService();

class GenreController {
    getAll = async (request: Request, response: Response) => {
        const allGenres = await genreService.getAll();
        return response.send(allGenres);
    };

    create = async (request: Request, response: Response) => {
        const {name} = request.body;
        const results = await genreService.create(name);
        return response.send(results);
    };

    update = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const {name} = request.body;
        const results = await genreService.update(id, name);
        return response.send(results);
    };

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const results = await genreService.delete(id);
        return response.send(results);
    };
}

export default GenreController;
