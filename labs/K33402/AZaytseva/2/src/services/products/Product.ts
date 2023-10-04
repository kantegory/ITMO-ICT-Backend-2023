import Product from "../../models/products/Product";

interface ProductCreateRequest {
  name: string;
  price: number;
}

class ProductRepository {
    async getAll() : Promise<Product[]> {
        const products = await Product.findAll()

        return products
    }

    async getById(id: number) : Promise<Product> {
        const product = await Product.findByPk(id)

        if (product) {
          return product.toJSON()
        }

        throw new Error('Not found!')
    }

    async create(productData: Partial<ProductCreateRequest>): Promise<Product> {
        const product = await Product.create(productData)
        return product.toJSON()
    }

    async deleteById(id: number): Promise<boolean> {
        const deletedRows = await Product.destroy({ where: { id } })
        return deletedRows > 0;
    }

    async updateById(id: number, productData: Partial<ProductCreateRequest>): Promise<boolean> {
        const affectedCount = await Product.update(productData, { where: { id } })

        if (affectedCount[0] < 1) {
            throw new Error('Not found!')
        }

        const product = await Product.findByPk(id)

        if (product) {
            return product.toJSON()
        }

        throw new Error('Not found!')
    }
}

export default ProductRepository