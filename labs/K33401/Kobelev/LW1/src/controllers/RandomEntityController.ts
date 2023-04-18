import { Request, Response } from "express"
import RandomEntityService from "../services/RandomEntity"

const randomEntityService = new RandomEntityService

class RandomEntityController {
    getAllRandomEntities = async (request: Request, response: Response) => {
        const allRandomEntities = await randomEntityService.getAll()
        return response.send(allRandomEntities)
    }

    createRandomEntity = async (request: Request, response: Response) => {
        let { randomProperty } = request.body
        const results = await randomEntityService.create(randomProperty)
        return response.send(results)
    }

    updateRandomEntity = async (request: Request, response: Response) => {
        let id = Number(request.params.id)
        let { randomProperty } = request.body
        const results = await randomEntityService.update(id, randomProperty)
        return response.send(results)
    }

    deleteRandomEntity = async (request: Request, response: Response) => {
        let id = Number(request.params.id)
        const results = await randomEntityService.delete(id)
        return response.send(results)
    }
}

export default RandomEntityController