import { Request, Response } from "express"

class CoinController {
    get_all = async (request: Request, response: Response) => {
        const todo = "get coins from Service"

        return response.send(todo)
    }

    get = async (request: Request, response: Response) => {
        const todo = "get specific coin from Service"

        return response.send(todo)
    }

    post = async (request: Request, response: Response) => {
        const todo = "create coin"

        return response.send(todo)
    }

    delete = async (request: Request, response: Response) => {
        const todo = "drop coin from Service"

        return response.send(todo)
    }
}

export default CoinController