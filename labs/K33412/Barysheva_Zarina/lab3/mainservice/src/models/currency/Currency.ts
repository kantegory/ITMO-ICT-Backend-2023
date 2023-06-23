import { Table, Column, Model, Unique, AllowNull } from 'sequelize-typescript'

@Table
class Currency extends Model {
    @Unique
    @AllowNull(false)
    @Column
    name: string

    @Column
    value: number 

}

export default Currency
