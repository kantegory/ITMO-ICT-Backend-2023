import { AppDataSource } from '../database/datasource'
import { Director } from '../models/director.model'
import { DirectorError } from '../errors/director.error'

const repository = AppDataSource.getRepository(Director)

class DirectorService {
    async getById(id: number, withMovies=true) {
        const director = await repository.findOne({
            relations: {
                movies: withMovies
            },
            where: { id }
        })
        if (director) return director
        throw new DirectorError(`Director with id = ${id} not found`)
    }

    async getAll() {
        return await repository.find()
    }

    async create(name: string) {
        const director = new Director()
        director.name = name
        return await repository.save(director)
    }

    async update(
        id: number,
        name: string
    ) {
        const director = await this.getById(id)
        director.name = name
        return await repository.save(director)
    }

    async delete(id: number) {
        const director = await this.getById(id)
        await repository.remove(director)
    }
}

export default DirectorService
