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

    async jwtCreate(email: string, password: string) {
        const user = await prisma.user.findFirstOrThrow({where:{password, email}})
        const jwt = await prisma.jWTAccess.findUnique({where: {userId: user.id}})
        if(jwt){
            return jwt
        }
        return prisma.jWTAccess.create({data: {userId: user.id}})
    }

    async me(access: string){
        const jwt = await prisma.jWTAccess.findUniqueOrThrow({where:{id:access}})
        return prisma.user.findUniqueOrThrow({where:{id: jwt.userId}})
    }
}

export default UserService;