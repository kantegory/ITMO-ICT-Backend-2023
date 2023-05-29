import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient()

interface UserModel extends Omit<User, "id">{}

class UserService {
    createUser(user: UserModel) {
        return prisma.user.create({data: user})
    }
    getById(id: number) {
        return prisma.user.findUniqueOrThrow({where: {id}})
    }
    getByEmail(email: string){
        return prisma.user.findUniqueOrThrow({where:{email}})
    }
    getUsers() {
        return prisma.user.findMany()
    }
}

export default UserService;