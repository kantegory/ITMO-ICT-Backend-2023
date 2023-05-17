import Product from '../../models/products/Product'
import sequelize from '../../providers/db'

class ProductService {

    async getById(id: number): Promise<Product> {
        const product = await Product.findByPk(id)
        if (product == null) {
            throw new Error("Invalid identifier")
        }
        return product.toJSON()
    }

    async create(productInfo: any): Promise<Product> {
        const product = await Product.create(productInfo)
        return product.toJSON()
    }

    async update(id: number, productData: Partial<Product>): Promise<Product> {
        try {
            const product = await Product.findByPk(id)

            if (product) {
                await product.update(productData)
                return product.toJSON()
            }
            throw new Error(`Product with id ${id} not found`)
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id: number): Promise<void> {
        const product = await Product.findOne({ where: { id: id } })
        if (product) {
            await product.destroy()
            return
        }
        throw new Error(`Product with id ${id} not found`)
    }

    async getName(name: string) {
        const product = await Product.findAll({ where: { 'name': name } })
        if (product) return product
        throw new Error(`Product with name ${name} was not found`)
    }

    async getCategory(category: string) {
        const product = await Product.findAll({ where: { 'category': category } })
        if (product) return product
        throw new Error(`Product with category ${category} was not found`)
    }

    async getArticleNum(article_num: string) {
        const product = await Product.findAll({ where: { 'article_num': article_num } })
        if (product) return product
        throw new Error(`Product with article_num ${article_num} was not found`)
    }

    async getCount(): Promise<any> {
        const result = await Product.findAll({
            attributes: ['name', [sequelize.fn('SUM', sequelize.col('count')), 'total_count']],
            group: ['name']
        })
        return result
    }
}

export default ProductService    