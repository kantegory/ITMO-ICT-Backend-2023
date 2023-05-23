import ProdService from "../services/product";

class ProdController {
    private productService: ProdService
    constructor() {
        this.productService = new ProdService()
    }

    get = async (request: any, response: any) => {
        try {
            const products = await this.productService.getAll()
            return response.json(products);
        } catch (e: any) {
            response.status(404).send({ "error": e.message })
        }
    }

    getbyId = async (request: any, response: any) => {
        try {
            const product = await this.productService.getById(request.params.id)
            return response.json(product);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getbyName = async (request: any, response: any) => {
        try {
            const product = await this.productService.getByName(request.params.name)
            return response.json(product);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    getbyCategory = async (request: any, response: any) => {
        try {
            const product = await this.productService.getByCategory(request.params.category)
            return response.json(product);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    } 

    countProds = async (request: any, response: any) => {
        try {
            const count = await this.productService.countProds()
            return response.json(count);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    countProdsByCategory = async (request: any, response: any) => {
        try {
            const count = await this.productService.countProdsByCategory()
            return response.json(count);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    totalEarn = async (request: any, response: any) => {
        try {
            const count = await this.productService.totalEarn()
            return response.json(count);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    totalEarnAll = async (request: any, response: any) => {
        try {
            const count = await this.productService.totalEarnAll()
            return response.json(count);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    
    totalEarnByCategory = async (request: any, response: any) => {
        try {
            const count = await this.productService.totalEarnByCategory()
            return response.json(count);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: any, response: any) => {
        try {
            const { body } = request
            const product = await this.productService.create(body);
            return response.json({ product, msg: "created" })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    put = async (request: any, response: any) => {
        try {
            const { body } = request;
            const product = await this.productService.update(request.params.id, body)
            return response.json({ product, msg: 'Update was succesful' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const product = await this.productService.delete(request.params.id)
            return response.json({ msg: 'Deletion was succesful' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}


export default ProdController