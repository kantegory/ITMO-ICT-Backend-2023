import { AppDataSource } from '../database/datasource'
import { Genre } from '../models/genre.model'
import { GenreError } from '../errors/genre.error'

const repository = AppDataSource.getRepository(Genre)

class GenreService {
    async getById(id: number, withMovies=true) {
        const genre = await repository.findOne({
            relations: {
                movies: withMovies
            },
            where: { id }
        })
        if (genre) return genre
        throw new GenreError(`Genre with id = ${id} not found`)
    }

    async getAll() {
        return await repository.find()
    }

    async create(name: string) {
        const genre = new Genre()
        genre.name = name
        return await repository.save(genre)
    }

    async update(
        id: number,
        name: string
    ) {
        const genre = await this.getById(id)
        genre.name = name
        return await repository.save(genre)
    }

    async delete(id: number) {
        const genre = await this.getById(id)
        await repository.remove(genre)
    }
}

export default GenreService
