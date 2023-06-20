import {AppDataSource} from "../database/data-source";
import {Book} from "../models/Book";
import {Reading} from "../models/Reading";

const readingRepository = AppDataSource.getRepository(Reading);

class ReadingRepository {
    async readById(id: number) {
        return await readingRepository.findOneOrFail({
            relations: {
                book: true,
            },
            where: {id: id},
        });
    }

    async readByIdUsername(username: string, id: number) {
        return await readingRepository.findOneOrFail({
            relations: {
                book: true,
            },
            where: {
                id: id,
                username: username
            },
        });
    }

    async readAll() {
        return await readingRepository.find({
            relations: {
                book: true,
            },
        });
    }

    async create(
        book: Book,
        username: string,
        review?: string,
        rate?: number,
    ) {
        const reading = new Reading();
        reading.book = book;
        reading.username = username;
        reading.review = review;
        reading.rate = rate;
        return await readingRepository.save(reading);
    }

    async update(
        username: string,
        id: number,
        review?: string,
        rate?: number,
    ) {
        const reading = await this.readByIdUsername(username, id);
        reading.review = review;
        reading.rate = rate;
        return await readingRepository.save(reading);
    }

    async delete(username: string, id: number) {
        const reading: Reading = await this.readByIdUsername(username, id);
        return await readingRepository.remove(reading);
    }
}

export default ReadingRepository;
