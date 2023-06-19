import { Table, Column, Model, Unique, AllowNull } from 'sequelize-typescript'

@Table
class Product extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    category: string

    @AllowNull(false)
    @Unique
    @Column
    article_num: string

    @AllowNull(false)
    @Column
    count: number

}

export default Product