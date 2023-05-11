import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient()

class UserService {
    createUser(user: User) {
        return prisma.user.create({data: user})
    }
    getById(id: number) {
        return prisma.user.findUniqueOrThrow({where: {id}})
    }

}

export default UserService;