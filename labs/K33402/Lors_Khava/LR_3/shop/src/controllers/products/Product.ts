import ProductService from '../../services/products/Product'

class ProductController {
    private productService: ProductService

    constructor() {
        this.productService = new ProductService()
    }

    get = async (request: any, response: any) => {
        try {
            const product = await this.productService.getById(
                Number(request.params.id)
            )

            response.send(product)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        const { body } = request
        try {
                const product = await this.productService.create(body)
            response.status(200).send(product)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    update = async (request: any, response: any) => {
        try {
        const { body } = request
                const product = await this.productService.update(request.params.id, body)
                response.send(product)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const product = await this.productService.delete(request.params.id)
                response.status(200).send({ "status": `Successfully deleted product with id ${request.params.id}` })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    getName = async (request: any, response: any) => {
        try {
            const product = await this.productService.getName(request.params.name)
            response.send(product)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getCategory = async (request: any, response: any) => {
        try {
            const product = await this.productService.getCategory(request.params.category)
            response.send(product)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getArticleNum = async (request: any, response: any) => {
        try {
            const product = await this.productService.getArticleNum(request.params.article_num)
            response.send(product)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getCount = async (request: any, response: any) => {
        try {
            const count = await this.productService.getCount()
            response.send(count)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }     
}

export default ProductController