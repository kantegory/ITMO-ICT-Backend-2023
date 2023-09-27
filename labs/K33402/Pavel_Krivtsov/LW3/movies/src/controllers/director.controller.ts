import {Request, Response} from 'express'
import DirectorService from '../services/director.service'

const directorService = new DirectorService()

class DirectorController {
    get = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const director = await directorService.getById(id)
            return response.send(director)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }
    getAll = async (request: Request, response: Response) => {
        const directors = await directorService.getAll()
        return response.send(directors)
    }

    create = async (request: Request, response: Response) => {
        try {
            const {name} = request.body
            const results = await directorService.create(name)
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    update = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const {name} = request.body
            const results = await directorService.update(id, name)
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    delete = async (request: Request, response: Response) => {
        const id = Number(request.params.id)
        try {
            await directorService.delete(id)
            return response
                .status(200)
                .send({msg: `Successfully deleted director with id = ${id}`})
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }
}

export default DirectorController
