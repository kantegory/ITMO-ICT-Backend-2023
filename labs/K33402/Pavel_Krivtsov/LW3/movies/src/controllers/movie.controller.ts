import {Request, Response} from 'express'
import MovieService from '../services/movie.service'

const movieService = new MovieService()

class MovieController {
    get = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const movie = await movieService.getById(id, true)
            return response.send(movie)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }
    getAll = async (request: Request, response: Response) => {
        try {
            const movies = await movieService.getAll(
                String(request.query.title),
                Number(request.query.genreId),
                String(request.query.sortField),
                String(request.query.sortType),
                Number(request.query.skip),
                Number(request.query.take)
            )
            return response.send(movies)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }

    }

    create = async (request: Request, response: Response) => {
        try {
            const {title, year, genreId, directorId} = request.body
            const results = await movieService.create(title, year, directorId, genreId)
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    update = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const {title, year, genreId, directorId} = request.body
            const results = await movieService.update(id, title, year, directorId, genreId)
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        try {
            await movieService.delete(id)
            return response
                .status(200)
                .send({msg: `Successfully deleted movie with id = ${id}`})
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }
}

export default MovieController
