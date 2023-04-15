import { Request, Response } from "express"

class PortfolioController {
    get_all = async (request: Request, response: Response) => {
        const todo = "get all rows by id_user from Portfolio table of DB"

        return response.send(todo)
    }

    get = async (request: Request, response: Response) => {
        const todo = "get specific row by id_user, id_coin from Portfolio table of DB"

        return response.send(todo)
    }

    post = async (request: Request, response: Response) => {
        const todo = "create row with specific coin, check on validation"

        return response.send(todo)
    }

    delete = async (request: Request, response: Response) => {
        const todo = "delete row by id_user, id_coin from DB"

        return response.send(todo)
    }
}

export default PortfolioController