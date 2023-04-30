import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript'

@Table
class Goods extends Model {
    @AllowNull(false)
    @Unique
    @Column
    articul: string

    @AllowNull(false)
    @Column
    count: number

    @AllowNull(false)
    @Column
    name: string
}

export default Goods
