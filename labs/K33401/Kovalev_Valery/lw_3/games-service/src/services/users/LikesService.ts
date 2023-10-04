import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

class LikesService {
    async get(userId: number) {
        return prisma.like.findMany({where: {userId}})
    }

    async post(gameId: number, userId: number) {
        const like = await prisma.like.findFirst({where: {userId, gameId}})
        if(like){
            return like
        }
        return prisma.like.create({data: {userId, gameId}})
    }

    async delete(likeId: number) {
        return prisma.like.delete({where: {id: likeId}})
    }
}

export default LikesService;