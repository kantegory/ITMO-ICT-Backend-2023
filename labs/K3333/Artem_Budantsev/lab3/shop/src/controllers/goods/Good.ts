import GoodService from '../../services/goods/Good'
import express from "express"


class GoodController {

    private goodService: GoodService

    constructor() {
        this.goodService = new GoodService()
    }

    get = async (req: express.Request, res: express.Response) => {

        res.type("json")

        const goods = await this.goodService.get();
        res.send(goods)
    }

    getById = async (request: any, response: any) => {
        try {
            const good = await this.goodService.getById(
                Number(request.params.id)
            )
            response.send(good)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (req: express.Request, response: express.Response) => {
        response.type("json") 
        const { body } = req
        try {
            const good = await this.goodService.create(body)
            response.send(good)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };

    patch = async (req: express.Request, response: express.Response) => {
        response.type("json")
        const { body } = req;
        const { id } = req.params

        try {
            const good = await this.goodService.update(Number(id), body)
            response.status(200).send(good)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };

    delete = async (req: express.Request, response: express.Response) => {
        response.type("json");
        const { id } = req.params;

        try {
            await this.goodService.delete(Number(id))
            response.status(204).send()
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };
}

export default GoodController