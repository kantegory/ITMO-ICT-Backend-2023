import {Request, Response} from 'express'
import GenreService from '../services/genre.service'

const genreService = new GenreService()

class GenreController {
    get = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const genre = await genreService.getById(id)
            return response.send(genre)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }
    getAll = async (request: Request, response: Response) => {
        const genres = await genreService.getAll()
        return response.send(genres)
    }

    create = async (request: Request, response: Response) => {
        try {
            const {name} = request.body
            const results = await genreService.create(name)
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    update = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const {name} = request.body
            const results = await genreService.update(id, name)
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        try {
            await genreService.delete(id)
            return response
                .status(200)
                .send({msg: `Successfully deleted genre with id = ${id}`})
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }
}

export default GenreController
