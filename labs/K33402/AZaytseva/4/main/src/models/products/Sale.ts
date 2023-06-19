import { Table, Column, Model, AllowNull, ForeignKey } from 'sequelize-typescript'
import Product from './Product'

@Table
class Sale extends Model {
    @AllowNull(false)
    @Column
    quantity: number

    @AllowNull(false)
    @Column
    price: number

    @ForeignKey(() => Product)
    @Column
    productId: number

    @AllowNull(false)
    @Column
    dateOfSale: Date
}

export default Sale
