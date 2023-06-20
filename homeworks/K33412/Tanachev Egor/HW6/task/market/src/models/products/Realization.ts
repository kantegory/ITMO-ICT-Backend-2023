import { Table, Column, Model, AllowNull, ForeignKey } from 'sequelize-typescript'
import Product from './Product'

@Table
class Realization extends Model {
    @AllowNull(false)
    @Column
    count: number

    @AllowNull(false)
    @Column
    price: number

    @ForeignKey(() => Product)
    @Column
    productId: number

    @AllowNull(false)
    @Column
    dateRealization: Date
}

export default Realization
