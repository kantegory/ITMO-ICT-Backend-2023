import SaleRepository from '../../services/products/Sale'
import SupplyRepository from '../../services/products/Supply'
import ProductRepository from '../../services/products/Product'

class SaleController {
    private saleRepository: SaleRepository
    private supplyRepository: SupplyRepository
    private productRepository: ProductRepository

    constructor() {
        this.saleRepository = new SaleRepository()
        this.supplyRepository = new SupplyRepository()
        this.productRepository = new ProductRepository()
    }

    get = async (request: any, response: any) => {
        try {
            if (request.params.id) {
                const sale = await this.saleRepository.getById(
                    Number(request.params.id)
                )

                response.send(sale)
            } else {
                if (request.query['product-id']) {
                    const sales = await this.saleRepository.getAll(Number(request.query['product-id']))
                    response.send(sales)
                } else {
                    const sales = await this.saleRepository.getAll()
                    response.send(sales)
                }
            }
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    addSale = async (request: any, response: any) => {
        const { body } = request

        try {
            if (!body.productId || !body.quantity) {
                throw new Error('productId and quantity must be provided')
            }

            const totalSupply = await this.supplyRepository.getSuppliedAmount({
                productId: body.productId
            })

            const totalSold = await this.saleRepository.getSoldAmount({
                productId: body.productId
            })

            const actualSupply = totalSupply - totalSold;

            if (Number.isNaN(actualSupply) || actualSupply -  body.quantity < 0) {
                throw new Error('Not enough supply of product')
            }

            const actualPrice = (await this.productRepository.getById(body.productId)).price

            const dateOfSale = new Date();
            dateOfSale.setUTCHours(0,0,0,0);

            const sale = await this.saleRepository.create({
                productId: body.productId,
                quantity: body.quantity,
                price: actualPrice * body.quantity,
                dateOfSale,
            })

            response.send(sale)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    getSoldRevenue = async (request: any, response: any) => {
        try {
            const soldRevenue = await this.saleRepository.getSoldRevenue({
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
            const soldAmount = await this.saleRepository.getSoldAmount({
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
            const sales = await this.saleRepository.getSalesRevenueGroupedByDay({
                productId: request.query['product-id'],
                dateFrom: request.query['date-from'],
                dateTo: request.query['date-to'],
            })

            response.send(sales)
            } catch (error: any) {
                response.status(404).send({ "error": error.message })
            }
        }

    getAmountStat = async (request: any, response: any) => {
        try {
            const sales = await this.saleRepository.getSalesAmountGroupedByDay({
                productId: request.query['product-id'],
                dateFrom: request.query['date-from'],
                dateTo: request.query['date-to'],
            })

            response.send(sales)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
  }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            if (body.id) {
                const sale = await this.saleRepository.updateById(body.id, body)
                response.status(200).send(sale)
            } else {
                const sale = await this.saleRepository.create(body)
                response.status(201).send(sale)
            }
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            let result;

            if (request.query.product) {
                result = await this.saleRepository.deleteByProductId(
                    Number(request.params.id)
                )
            } else {
                result = await this.saleRepository.deleteById(
                    Number(request.params.id)
                )
            }

            response.status(result ? 200 : 400).send({});
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default SaleController