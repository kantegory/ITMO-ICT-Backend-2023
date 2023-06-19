import { Request, Response } from "express"

class TestController {
    get = async (request: Request, response: Response) => {
        return response.send('Hello, world!')
    }
}

export default TestController