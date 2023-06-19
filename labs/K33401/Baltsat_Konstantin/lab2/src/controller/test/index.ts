import { Request, Response } from "express"

class TestController {
    getTest = async (request: Request, response: Response) => {
        return response.send('Hello, world!')
    }
}

export default TestController