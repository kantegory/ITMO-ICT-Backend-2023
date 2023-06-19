import RealizationService from '../../services/products/Realization'
import SupplyService from '../../services/products/Supply'
import ProductService from '../../services/products/Product'

class RealizationController {
    private realizationService: RealizationService
    private supplyService: SupplyService
    private productService: ProductService

    constructor() {
        this.realizationService = new RealizationService()
        this.supplyService = new SupplyService()
        this.productService = new ProductService()
    }

    get = async (request: any, response: any) => {
        try {
            if (request.params.id) {
                const realization = await this.realizationService.getById(
                    Number(request.params.id)
                )

                response.send(realization)
            } else {
                const realizations = await this.realizationService.getAll()

                response.send(realizations)
            }
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    addRealization = async (request: any, response: any) => {
        const { body } = request

        try {
            if (!body.productId || !body.count) {
                throw new Error('productId and count must be provided')
            }

            const totalSupply = await this.supplyService.getSuppliedAmount({
                productId: body.productId
            })

            const totalSold = await this.realizationService.getSoldAmount({
                productId: body.productId
            })

            const actualSupply = totalSupply - totalSold;

            if (Number.isNaN(actualSupply) || actualSupply -  body.count < 0) {
                throw new Error('Not enough supply of product')
            }

            const actualPrice = (await this.productService.getById(body.productId)).price

            const dateRealization = new Date();
            dateRealization.setUTCHours(0,0,0,0);

            const realization = await this.realizationService.create({
                productId: body.productId,
                count: body.count,
                price: actualPrice * body.count,
                dateRealization,
            })

            response.send(realization)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    getSoldRevenue = async (request: any, response: any) => {
        try {
            const soldRevenue = await this.realizationService.getSoldRevenue({
                productId: request.query['product-id'],
                dateFrom: request.query['date-from'],
                dateTo: request.query['date-to'],
            })

            response.send({ revenue: soldRevenue })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getSoldAmount = async (request: any, response: any) => {
        try {
            const soldAmount = await this.realizationService.getSoldAmount({
                productId: request.query['product-id'],
                dateFrom: request.query['date-from'],
                dateTo: request.query['date-to'],
            })

            response.send({ amount: soldAmount })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getRevenueStat = async (request: any, response: any) => {
        try {
            const realizations = await this.realizationService.getRealizationsRevenueGroupedByDay({
                productId: request.query['product-id'],
                dateFrom: request.query['date-from'],
                dateTo: request.query['date-to'],
            })

            response.send(realizations)
            } catch (error: any) {
                response.status(404).send({ "error": error.message })
            }
        }

    getAmountStat = async (request: any, response: any) => {
        try {
            const realizations = await this.realizationService.getRealizationsAmountGroupedByDay({
                productId: request.query['product-id'],
                dateFrom: request.query['date-from'],
                dateTo: request.query['date-to'],
            })

            response.send(realizations)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
  }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            if (body.id) {
                const realization = await this.realizationService.updateById(body.id, body)
                response.status(200).send(realization)
            } else {
                const realization = await this.realizationService.create(body)
                response.status(201).send(realization)
            }
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            let result;

            if (request.query.product) {
                result = await this.realizationService.deleteByProductId(
                    Number(request.params.id)
                )
            } else {
                result = await this.realizationService.deleteById(
                    Number(request.params.id)
                )
            }

            response.status(result ? 200 : 400).send({});
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default RealizationController