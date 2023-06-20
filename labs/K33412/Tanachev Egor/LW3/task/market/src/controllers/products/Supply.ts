import SupplyService from '../../services/products/Supply'

class SupplyController {
    private supplyService: SupplyService

    constructor() {
        this.supplyService = new SupplyService()
    }

    get = async (request: any, response: any) => {
        try {
            if (request.params.id) {
                const supply = await this.supplyService.getById(
                    Number(request.params.id)
                )

                response.send(supply)
            } else {
                const supplies = await this.supplyService.getAll()

                response.send(supplies)
            }
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getSuppliedProductAmount = async (request: any, response: any) => {
        try {
            const suppliedAmount = await this.supplyService.getSuppliedAmount({
                productId: request.query['product-id'],
                dateFrom: request.query['date-from'],
                dateTo: request.query['date-to'],
            })

            response.send({ amount: suppliedAmount })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            if (body.id) {
                const supply = await this.supplyService.updateById(body.id, body)
                response.status(200).send(supply)
            } else {
                const supply = await this.supplyService.create(body)
                response.status(201).send(supply)
            }
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            let result;

            if (request.query.product) {
                result = await this.supplyService.deleteByProductId(
                    Number(request.params.id)
                )
            } else {
                result = await this.supplyService.deleteById(
                    Number(request.params.id)
                )
            }

            response.status(result ? 200 : 400).send({});
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default SupplyController