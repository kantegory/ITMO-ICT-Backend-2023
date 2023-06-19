import ReadingRepository from "../repositories/Reading";
import UserService from "./User";
import BookService from "./Book";

const readingRepository = new ReadingRepository();
const bookService = new BookService();
const userService = new UserService();

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
        const user = await userService.getByUsername(username);
        return readingRepository.create(book, user, review, rate);
    }

    async update(
        id: number,
        review?: string,
        rate?: number,
    ) {
        return readingRepository.update(id, review, rate);
    }

    async delete(id: number) {
        return readingRepository.delete(id);
    }
}

export default ReadingService;
