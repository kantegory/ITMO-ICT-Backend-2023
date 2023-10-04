import Product from "../models/product";
import sequelize from '../providers/db'
const prodRepository = sequelize.getRepository(Product)

class ProdService {

    async create(prodInfo: any) {
        try {
            const prod = await Product.create(prodInfo)
            return prod
        } catch (e: any) {
            throw new Error(e)
        }
        }

    async getAll(){
        const prods = await Product.findAll()

        if (prods) return prods
        else return { "message": "Products were not found" }

    }
    
    async getById(id: number) {
        const prod = await Product.findByPk(id)

        if (prod) return prod

        throw new Error(`Product with id ${id} was not found`)
    }

    async getByName(name: string) {
        const prod = await Product.findAll({ where: { name: name } })

        if (prod) return prod

        throw new Error(`Product with name ${name} was not found`)
    }

    async getByCategory(category: string) {
        const prod = await Product.findAll({ where: { category: category } })

        if (prod) return prod

        throw new Error(`Product with category ${category} was not found`)
    }

    async update(id:number, data: any) {
        try { 
            const prod = await Product.findByPk(id)
            if (prod) {
                prod.update(data)
            }
            return prod
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id:number) {
        try {
            await Product.destroy({where: {id:id}})
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async countProds (): Promise<any> {
            const table = await prodRepository.findAll({
            attributes: ['id', 'name', [sequelize.fn('SUM', sequelize.col('count')), 'total_count']],
            group: ['id']
        });
        if (table) return table

        
}
    async countProdsByCategory (): Promise<any> {
            const table = await prodRepository.findAll({
            attributes: ['category', [sequelize.fn('SUM', sequelize.col('count')), 'total_count']],
            group: ['category']
        });
        if (table) return table
        
}

    async totalEarn (): Promise<any> {
            const table = await prodRepository.findAll({
            attributes: ['id','name', [sequelize.literal('price * count'), 'total_earn']],
            group: ['id']
        });
        if (table) return table

}
    async totalEarnAll (): Promise<any> {
            const table = await prodRepository.findAll({
            attributes: [[sequelize.fn('SUM', sequelize.literal('price * count')), 'total_earn']],
        });
        if (table) return table

        }

    async totalEarnByCategory (): Promise<any> {
            const table = await prodRepository.findAll({
            attributes: ['category', [sequelize.fn('SUM', sequelize.literal('price * count')), 'total_earn']],
            group: ['category']
        });
        if (table) return table

        }
}



export default ProdService