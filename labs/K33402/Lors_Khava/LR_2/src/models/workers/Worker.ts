import { Table, Column, Model, Unique, AllowNull } from 'sequelize-typescript'

@Table
class Worker extends Model {
    @AllowNull(false)
    @Column
    firstName: string

    @AllowNull(false)
    @Column
    lastName: string

    @AllowNull(false)
    @Unique
    @Column
    passport: string

    @Column
    salary: number

    @AllowNull(false)
    @Column
    position: string

}

export default Worker