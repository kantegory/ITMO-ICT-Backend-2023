import { Request, Response } from "express"
import { AppDataSource } from "../database/data-source"
import { User } from "../models/User"
import { RandomEntity } from "../models/RandomEntity"

const userRepository = AppDataSource.getRepository(User)
const randomEntityRepository = AppDataSource.getRepository(RandomEntity)

class UserController {
    getAllUsers = async (request: Request, response: Response) => {
        const allUsers = await (userRepository.find({
            select: ["id", "username"]
        }))
        return response.send(allUsers)
    }

    addUserRandomEntity = async (request: Request, response: Response) => {
        let randomEntity =  await randomEntityRepository.findOneOrFail({ where: { id: Number(request.params.id) }})
        let user = await userRepository.findOneOrFail({ where: { username: response.locals.jwtPayload.username }})
        await userRepository
            .createQueryBuilder()
            .relation(User, 'randomEntities')
            .of(user)
            .add(randomEntity);

        return response.send(user)
    }

    removeUserRandomEntity = async (request: Request, response: Response) => {
        let randomEntity =  await randomEntityRepository.findOneOrFail({ where: { id: Number(request.params.id) }})
        let user = await userRepository.findOneOrFail({ where: { username: response.locals.jwtPayload.username }})
        await userRepository
            .createQueryBuilder()
            .relation(User, 'randomEntities')
            .of(user)
            .remove(randomEntity);

        return response.send(user)
    }

    getMyRandomEntities = async (request: Request, response: Response) => {
        let user = await userRepository.findOneOrFail({
            select: ["id", "username"],
            relations: {
                randomEntities: true,
            },
            where: { username: response.locals.jwtPayload.username }
        })

        return response.send(user)
    }
}

export default UserController