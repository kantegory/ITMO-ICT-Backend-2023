import { Table, Column, Model, AllowNull, ForeignKey } from 'sequelize-typescript'
import Product from './Product'

@Table
class Supply extends Model {
    @AllowNull(false)
    @Column
    quantity: number

    @ForeignKey(() => Product)
    @Column
    productId: number

    @AllowNull(false)
    @Column
    dateOfSupply: Date
}

export default Supply
