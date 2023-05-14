import {PrismaClient, User} from "@prisma/client";

const prisma = new PrismaClient()

interface UserModel extends Omit<User, "id"> {
}

class UserService {
    createUser(user: UserModel) {
        return prisma.user.create({data: user})
    }

    getById(id: number) {
        return prisma.user.findUniqueOrThrow({where: {id}})
    }

    getByEmail(email: string) {
        return prisma.user.findUniqueOrThrow({where: {email}})
    }

    getUsers() {
        return prisma.user.findMany()
    }

    async changeName(id: number, name: string) {
        return prisma.user.update({where: {id: id}, data: {name: name}});
    }

    async deleteUser(id: number) {
        return prisma.user.delete({where: {id: id}})
    }

    async jwtCreate(email: string, password: string) {
        const user = await prisma.user.findFirstOrThrow({where: {password, email}})
        const access = await prisma.jWTAccess.findUnique({where: {userId: user.id}})
        if (access) {
            const refresh = await prisma.jWTRefresh.findUnique({where: {jwtAccessId: access.id}})
            if (refresh) {
                return {access, refresh}
            } else {
                const refresh = await prisma.jWTRefresh.create({data: {jwtAccessId: access.id}})
                return {access, refresh}
            }
        } else {
            const access = await prisma.jWTAccess.create({data: {userId: user.id}})
            const refresh = await prisma.jWTRefresh.create({data: {jwtAccessId: access.id}})
            return {access, refresh}
        }
    }

    async jwtRefresh(refreshId: string) {
        const oldRefresh = await prisma.jWTRefresh.findUniqueOrThrow({where: {id: refreshId}})
        const oldAccess = await prisma.jWTAccess.delete({where: {id: oldRefresh.jwtAccessId}})
        const access = await prisma.jWTAccess.create({data: {userId: oldAccess.userId}})
        const refresh = await prisma.jWTRefresh.create({data: {id: oldRefresh.id, jwtAccessId: access.id}})
        return {access, refresh}
    }

    async me(access: string) {
        const jwt = await prisma.jWTAccess.findUniqueOrThrow({where: {id: access}})
        return prisma.user.findUniqueOrThrow({where: {id: jwt.userId}})
    }
}

export default UserService;