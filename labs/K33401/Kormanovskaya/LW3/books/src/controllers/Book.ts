import {Request, Response} from "express";
import BookService from "../services/Book";

const bookService = new BookService();

class BookController {
    getAll = async (request: Request, response: Response) => {
        const author = Number(request.query.author);
        const genre = Number(request.query.genre);
        const sort = String(request.query.sort);
        const allBooks = await bookService.getAll(sort, author, genre);
        return response.send(allBooks);
    };

    create = async (request: Request, response: Response) => {
        const {title, description, genreId, authorId} = request.body;
        const results = await bookService.create(title, description, genreId, authorId);
        return response.send(results);
    };

    update = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const {title, description} = request.body;
        const results = await bookService.update(id, title, description);
        return response.send(results);
    };

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id);
        const results = await bookService.delete(id);
        return response.send(results);
    };
}

export default BookController;