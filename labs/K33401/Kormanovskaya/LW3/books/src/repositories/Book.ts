import {AppDataSource} from "../database/data-source";
import {Book} from "../models/Book";
import {Author} from "../models/Author";
import {Genre} from "../models/Genre";

const bookRepository = AppDataSource.getRepository(Book);

class BookRepository {
    async readById(id: number) {
        return await bookRepository.findOneOrFail({
            relations: {
                author: true,
                genre: true
            },
            where: {id: id},
        });
    }

    async readAll(
        sort?: string,
        author?: Author,
        genre?: Genre
    ) {
        const params = {
            relations: {
                author: true,
                genre: true
            },
            where: {}
        }
        if (author) {
            params['where']['author'] = author
        }
        if (genre) {
            params['where']['genre'] = genre
        }
        if (sort) {
            params['order'] = {
                title: sort
            }
        }
        return await bookRepository.find(params);
    }

    async create(
        title: string,
        description: string,
        genre: Genre,
        author: Author
    ) {
        const book = new Book();
        book.title = title;
        book.description = description;
        book.author = author;
        book.genre = genre;
        return await bookRepository.save(book);
    }

    async update(
        id: number,
        title: string,
        description: string,
    ) {
        const book = await this.readById(id);
        book.title = title;
        book.description = description;
        return await bookRepository.save(book);
    }

    async delete(id: number) {
        const book = await this.readById(id);
        return await bookRepository.remove(book);
    }
}

export default BookRepository;
