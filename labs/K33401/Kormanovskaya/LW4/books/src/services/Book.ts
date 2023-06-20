import BookRepository from "../repositories/Book";
import GenreService from "./Genre";
import AuthorService from "./Author";

const bookRepository = new BookRepository();
const genreService = new GenreService();
const authorService = new AuthorService();

class BookService {
    async getById(id: number) {
        return bookRepository.readById(id);
    }

    async getAll(
        sort? : string,
        authorId?: number,
        genreId?: number,
    ) {
        let genre = null;
        let author = null;
        if (genreId){
            genre = await genreService.getById(genreId);
        }
        if (authorId){
            author = await authorService.getById(authorId);
        }
        return bookRepository.readAll(sort, author, genre);
    }

    async create(
        title: string,
        description: string,
        genreId: number,
        authorId: number,
    ) {
        const genre = await genreService.getById(genreId);
        const author = await authorService.getById(authorId);
        return await bookRepository.create(title, description, genre, author);
    }

    async update(
        id: number,
        title: string,
        description: string,
    ) {
        return bookRepository.update(id, title, description);
    }

    async delete(id: number) {
        return bookRepository.delete(id);
    }
}

export default BookService;
