import {AppDataSource} from "../database/data-source";
import {Book} from "../models/Book";
import {Reading} from "../models/Reading";
import {User} from "../models/User";

const readingRepository = AppDataSource.getRepository(Reading);

class ReadingRepository {
    async readById(id: number) {
        return await readingRepository.findOneOrFail({
            relations: {
                user: true,
                book: true,
            },
            where: {id: id},
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
        user: User,
        review?: string,
        rate?: number,
    ) {
        const reading = new Reading();
        reading.book = book;
        reading.user = user;
        reading.review = review;
        reading.rate = rate;
        return await readingRepository.save(reading);
    }

    async update(
        id: number,
        review?: string,
        rate?: number,
    ) {
        const reading = await this.readById(id);
        reading.review = review;
        reading.rate = rate;
        return await readingRepository.save(reading);
    }

    async delete(id: number) {
        const reading : Reading = await this.readById(id);
        return await readingRepository.remove(reading);
    }
}

export default ReadingRepository;
