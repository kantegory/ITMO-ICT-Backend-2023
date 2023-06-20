import ReadingRepository from "../repositories/Reading";
import BookService from "./Book";

const readingRepository = new ReadingRepository();
const bookService = new BookService();

class ReadingService {
    async getById(id: number) {
        return readingRepository.readById(id);
    }

    async getAll() {
        return readingRepository.readAll();
    }

    async create(
        bookId: number,
        username: string,
        review?: string,
        rate?: number,
    ) {
        const book = await bookService.getById(bookId);
        return readingRepository.create(book, username, review, rate);
    }

    async update(
        username: string,
        id: number,
        review?: string,
        rate?: number,
    ) {
        return readingRepository.update(username, id, review, rate);
    }

    async delete(username: string, id: number) {
        return readingRepository.delete(username, id);
    }
}

export default ReadingService;
