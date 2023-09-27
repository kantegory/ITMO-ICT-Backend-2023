import {AppDataSource} from '../database/datasource'
import {Watchlist} from '../models/watchlist.model'
import {WatchlistError} from '../errors/watchlist.error'
import UserService from "./user.service";
import MovieService from "./movie.service";

const repository = AppDataSource.getRepository(Watchlist)
const userService = new UserService()
const movieService = new MovieService()

class WatchlistService {
    async getById(id: number, withMovies = false, withUser = false) {
        const watchlist = await repository.findOne({
            relations: {
                movie: withMovies,
                user: withUser
            },
            where: {id}
        })
        if (watchlist) return watchlist
        throw new WatchlistError(`Watchlist with id = ${id} not found`)
    }

    async getAll() {
        return await repository.find({
            relations: {
                movie: true
            }
        })
    }

    async getAllByUsername(username: string) {
        console.log(username)
        const user = await userService.getByUsername(username)
        return await repository.find({
            relations: {
                user: false,
                movie: {
                    genre: true,
                    director: true
                }
            },
            where: {
                user: {
                    username: username
                }
            }
        })
    }

    async create(
        username: string,
        movieId: number
    ) {
        const watchlist = new Watchlist()
        const user = await userService.getByUsername(username)
        const movie = await movieService.getById(movieId)
        watchlist.user = user
        watchlist.movie = movie
        return await repository.save(watchlist)
    }

    async update(
        id: number,
        rate: number,
        username: string
    ) {
        const watchlist = await this.getById(id, false, true)
        if (watchlist.user.username !== username) throw new WatchlistError("Unauthorized")
        watchlist.rate = rate
        return await repository.save(watchlist)
    }

    async delete(id: number, username: string) {
        const watchlist = await this.getById(id, false, true)
        if (watchlist.user.username !== username) throw new WatchlistError("Unauthorized")
        await repository.remove(watchlist)
    }
}

export default WatchlistService
