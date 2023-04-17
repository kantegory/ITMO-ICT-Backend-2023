import { Request, Response } from "express"
import { AppDataSource } from "../database/data-source"
import { RandomEntity } from "../models/RandomEntity"
import RandomEntityService from "../services/RandomEntity";

const randomEntityRepository = AppDataSource.getRepository(RandomEntity)
const randomEntityService = new RandomEntityService

class RandomEntityController {
    getAllRandomEntities = async (request: Request, response: Response) => {
        const allRandomEntities = await (randomEntityRepository.find())
        return response.send(allRandomEntities)
    }

    createRandomEntity = async (request: Request, response: Response) => {
        let { randomProperty } = request.body
        let randomEntity = new RandomEntity()
        randomEntity.randomProperty = randomProperty
        const results = await randomEntityRepository.save(randomEntity)
        return response.send(results)
    }

    updateRandomEntity = async (request: Request, response: Response) => {
        const randomEntity = await randomEntityService.getById(Number(request.params.id))
        randomEntity.randomProperty = request.body.randomProperty
        const results = await randomEntityRepository.save(randomEntity)
        return response.send(results)
    }

    deleteRandomEntity = async (request: Request, response: Response) => {
        const randomEntity = await randomEntityService.getById(Number(request.params.id))
        const results = await randomEntityRepository.delete(randomEntity)
        return response.send(results)
    }
}

export default RandomEntityController