import { Table, Column, Model, AllowNull, ForeignKey } from 'sequelize-typescript'
import Product from './Product'

@Table
class Supply extends Model {
    @AllowNull(false)
    @Column
    count: number

    @ForeignKey(() => Product)
    @Column
    productId: number

    @AllowNull(false)
    @Column
    dateSupply: Date
}

export default Supply
