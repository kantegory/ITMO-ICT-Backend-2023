import {PrismaClient, Game} from "@prisma/client";

const prisma = new PrismaClient()

interface GameModel extends Omit<Game, "id" | "categories" | "genres"> {
}

class GamesService {
    async createGame(game: GameModel, genres: String[] = [], categories: String[] = []) {
        return prisma.game.create({
            data: {
                ...game, categories: {
                    // @ts-ignore
                    connectOrCreate: categories.map((c: String) => {
                        return {
                            where: {name: c.toUpperCase()},
                            create: {name: c.toUpperCase()}
                        }
                    }),
                    // @ts-ignore
                    genres: {
                        connectOrCreate: genres.map((g: String) => {
                            return {
                                where: {name: g.toUpperCase()},
                                create: {name: g.toUpperCase()}
                            }
                        })
                    }
                }
            }
        });
    }

    async getAll(count: number = 10, offset: number = 0, developer?: string, publisher?: string, orderByPrice?: string) {

        let gameWhere: any = {}
        if (publisher) {
            gameWhere["publisher"] = {contains: publisher}
        }
        if (developer) {
            gameWhere["developer"] = {contains: developer}
        }

        let gameOrderBy: any = {}
        if (orderByPrice) {
            gameOrderBy["price"] = orderByPrice
        }
        return {
            total: await prisma.game.count({
                where: gameWhere,
                orderBy: gameOrderBy,
            }),
            result: await prisma.game.findMany({
                where: gameWhere,
                orderBy: gameOrderBy,
                include: {categories: true, genres: true},
                skip: offset,
                take: count,
            })
        }
    }

    async getGamesByName(name: string) {
        return prisma.game.findMany({where: {name}})
    }

    async deleteGame(id: number) {
        return prisma.game.delete({where: {id}})
    }

    async getGamesByDeveloper(developer: string) {
        return prisma.game.findMany({where: {developer: developer.toUpperCase()}})
    }

}

export default GamesService;