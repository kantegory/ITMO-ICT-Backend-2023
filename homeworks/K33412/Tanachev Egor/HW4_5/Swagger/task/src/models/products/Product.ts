import { Table, Column, Model, AllowNull } from 'sequelize-typescript'

@Table
class Product extends Model {
    @AllowNull(false)
    @Column
    name: string

    @Column
    price: number
}

export default Product
