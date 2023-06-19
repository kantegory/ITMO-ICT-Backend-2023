import {Request, Response} from "express";
import ReadingService from "../services/Reading";

const readingService = new ReadingService();

class ReadingController {
    getAll = async (request: Request, response: Response) => {
        const allReadings = await readingService.getAll();
        return response.send(allReadings);
    };

    create = async (request: Request, response: Response) => {
        const username = response.locals.jwtPayload.username;
        const {bookId, review, rate} = request.body;
        const results = await readingService.create(bookId, username, review, rate);
        return response.send(results);
    };

    update = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const {review, rate} = request.body;
        const results = await readingService.update(id, review, rate);
        return response.send(results);
    };

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const results = await readingService.delete(id);
        return response.send(results);
    };
}

export default ReadingController;