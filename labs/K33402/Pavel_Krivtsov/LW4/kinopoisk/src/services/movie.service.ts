import {AppDataSource} from '../database/datasource'
import {Movie} from '../models/movie.model'
import {MovieError} from '../errors/movie.error'
import DirectorService from "./director.service";
import GenreService from "./genre.service";
import {Genre} from "../models/genre.model";

const repository = AppDataSource.getRepository(Movie)
const directorService = new DirectorService()
const genreService = new GenreService()

class MovieService {
    async getById(id: number, avgRate = false) {
        const movie = await repository.findOne({
            relations: {
                genre: true,
                director: true
            },
            where: {id}
        })
        if (movie) {
            if (avgRate) {
                movie['avgRate'] = 5
            }
            return movie
        }
        throw new MovieError(`Movie with id = ${id} not found`)
    }

    async getAll(
        title?: string,
        genreId?: number,
        sortField?: string,
        sortType?: string,
        skip?: number,
        take?: number
    ) {
        const options = {
            where: {},
            order: {},
            relations: {
                director: true,
                genre: true
            }
        }
        if (title !== "undefined") options["where"]["title"] = title
        if (genreId) options["where"]["genre"] = await genreService.getById(genreId, false)
        if (sortField !== "undefined" && sortType !== "undefined") options["order"][sortField] = sortType
        if (skip && take) {
            options["skip"] = skip
            options["take"] = take
        }
        return await repository.find(options)
    }

    async create(
        title: string,
        year: number,
        directorId: number,
        genreId: number
    ) {
        const movie = new Movie()
        const director = await directorService.getById(directorId, false)
        const genre = await genreService.getById(genreId, false)
        movie.title = title
        movie.year = year
        movie.director = director
        movie.genre = genre
        return await repository.save(movie)
    }

    async update(
        id: number,
        title: string,
        year: number,
        directorId: number,
        genreId: number
    ) {
        const movie = await this.getById(id)
        const director = await directorService.getById(directorId, false)
        const genre = await genreService.getById(genreId, false)
        movie.title = title
        movie.year = year
        movie.director = director
        movie.genre = genre
        return await repository.save(movie)
    }

    async delete(id: number) {
        const movie = await this.getById(id)
        await repository.remove(movie)
    }
}

export default MovieService
