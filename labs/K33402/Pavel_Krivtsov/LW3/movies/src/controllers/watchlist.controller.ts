import {Request, Response} from 'express'
import WatchlistService from '../services/watchlist.service'
import {getUsername} from "../utils/getUsername"

const watchlistService = new WatchlistService()

class WatchlistController {
    get = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const watchlist = await watchlistService.getById(id)
            return response.send(watchlist)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    getAll = async (request: Request, response: Response) => {
        try {
            const watchlists = await watchlistService.getAll()
            return response.send(watchlists)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    getAllByUsername = async (request: Request, response: Response) => {
        try {
            const username = await getUsername(request)
            const watchlists = await watchlistService.getAllByUsername(username)
            return response.send(watchlists)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }

    }

    create = async (request: Request, response: Response) => {
        try {
            const username = await getUsername(request)
            const {movieId} = request.body
            const results = await watchlistService.create(username, movieId)
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    update = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const username = await getUsername(request)
            const {rate} = request.body
            const results = await watchlistService.update(id, rate, username)
            return response.send(results)
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }

    delete = async (request: Request, response: Response) => {
        try {
            const id = Number(request.params.id)
            const username = await getUsername(request)
            await watchlistService.delete(id, username)
            return response
                .status(200)
                .send({msg: `Successfully deleted watchlist with id = ${id}`})
        } catch (error: any) {
            return response.status(404).send({error: error.message})
        }
    }
}

export default WatchlistController
