import GamesService from "../../services/users/GamesService";
import {Request, response, Response} from "express";
import axios from "axios";

class GamesController {
    private gamesService: GamesService

    constructor() {
        this.gamesService = new GamesService()
    }

    getAll = async (req: Request, res: Response) => {
        let {offset, count, developer, publisher, sortByPrice} = req.query
        offset = offset ? offset : "0"
        count = count ? count : "10"
        sortByPrice = ["desc", "asc"].includes(String(sortByPrice)) ? String(sortByPrice) : undefined
        developer = developer ? String(developer) : undefined
        publisher = publisher ? String(publisher) : undefined
        const {
            total,
            result
        } = await this.gamesService.getAll(Number(count), Number(offset), developer, publisher, sortByPrice)
        res.json({total, offset, count, result})
    }

    deleteGame = async (req: Request, res: Response) => {
    }

}

export default GamesController;
