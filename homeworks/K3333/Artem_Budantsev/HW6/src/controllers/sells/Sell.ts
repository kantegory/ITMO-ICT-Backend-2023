import SellService from '../../services/sells/Sell'
import express from "express"


class SellController {

    private sellService: SellService

    constructor() {
        this.sellService = new SellService()
    }

    get = async (req: express.Request, res: express.Response) => {

        res.type("json")

        const users = await this.sellService.get();
        res.send(users)
    }
 
    count = async (req: express.Request, res: express.Response) => {
        res.type("json")
        const name = req.query.name
        try {
            let totalCount = name ? await this.sellService.countByGood(name) : await this.sellService.count()

            const result = totalCount != null ? {"count of goods": totalCount}  : 
                {"error": "good not found"}
            
            res.send(result)
        } catch (error: any) {
            res.status(404).send({ "error": error.message })
        }
    }


    earning = async (req: express.Request, res: express.Response) => {
        res.type("json")
        const name = req.query.name
        try {
            let totalEarning = name ? await this.sellService.earningByGood(name) : await this.sellService.earning()

            const result = totalEarning != null ? {"total earning by good": totalEarning}  : 
                {"error": "good not found"}
            
            res.send(result)
        } catch (error: any) {
            res.status(404).send({ "error": error.message })
        }
    }


    post = async (req: express.Request, response: express.Response) => {
        response.type("json") 
        const { body } = req
        try {
            const sell = await this.sellService.create(body)

            response.send(sell)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };

    patch = async (req: express.Request, response: express.Response) => {
        response.type("json")
        const { body } = req;
        const { id } = req.params

        try {
            const sell = await this.sellService.update(Number(id), body)
            response.status(200).send(sell)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    };
}

export default SellController