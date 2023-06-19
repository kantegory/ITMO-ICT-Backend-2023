import { Table, Model, PrimaryKey, Column, AllowNull} from "sequelize-typescript";

@Table
class Product extends Model {
    @PrimaryKey
    @Column
    id: number

    @AllowNull(false)
    @Column
    count: number

    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    category: string

    @AllowNull(false)
    @Column
    price: number
}

export default Product