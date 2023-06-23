import { Table, Column, Model, AllowNull, ForeignKey } from 'sequelize-typescript'
import User from '../users/User'
import Currency from '../currency/Currency'

@Table
class Briefcase extends Model {
    @AllowNull(false)
    @Column
    count: number

    @ForeignKey(() => User)
    @Column
    userId: number 

    @ForeignKey(() => Currency)
    @Column
    currencyId: number 
}

export default Briefcase
