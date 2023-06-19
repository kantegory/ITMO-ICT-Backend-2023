import ProductRepository from '../../services/products/Product'

class ProductController {
    private productRepository: ProductRepository

    constructor() {
        this.productRepository = new ProductRepository()
    }

    get = async (request: any, response: any) => {
        try {
            if (request.params.id) {
                const product = await this.productRepository.getById(
                    Number(request.params.id)
                )

                response.send(product)
            } else {
                const products = await this.productRepository.getAll()

                response.send(products)
            }
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request

        try {
            if (body.id) {
                const user = await this.productRepository.updateById(body.id, body)
                response.status(200).send(user)
            } else {
                const user = await this.productRepository.create(body)
                response.status(201).send(user)
            }
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const result = await this.productRepository.deleteById(
                Number(request.params.id)
            )


            response.status(result ? 200 : 400).send({});
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default ProductController