import ProductService from '../../services/products/Product'

class ProductController {
    private productService: ProductService

    constructor() {
        this.productService = new ProductService()
    }

    get = async (request: any, response: any) => {
        try {
            if (request.params.id) {
                const product = await this.productService.getById(
                    Number(request.params.id)
                )

                response.send(product)
            } else {
                const products = await this.productService.getAll()

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
                const user = await this.productService.updateById(body.id, body)
                response.status(200).send(user)
            } else {
                const user = await this.productService.create(body)
                response.status(201).send(user)
            }
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const result = await this.productService.deleteById(
                Number(request.params.id)
            )


            response.status(result ? 200 : 400).send({});
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}

export default ProductController