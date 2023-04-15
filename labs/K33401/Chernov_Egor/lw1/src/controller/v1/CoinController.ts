import { Request, Response } from "express"

class CoinController {
    get_all = async (request: Request, response: Response) => {
        const todo = "get coins from DB"

        return response.send(todo)
    }

    get = async (request: Request, response: Response) => {
        const todo = "get specific coin from DB"

        return response.send(todo)
    }

    post = async (request: Request, response: Response) => {
        const todo = "create coin"

        return response.send(todo)
    }

    delete = async (request: Request, response: Response) => {
        const todo = "drop coin from DB"

        return response.send(todo)
    }
}

export default CoinController