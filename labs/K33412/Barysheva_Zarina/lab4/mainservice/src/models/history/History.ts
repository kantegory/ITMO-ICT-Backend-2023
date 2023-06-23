import { Table, Column, Model, AllowNull, ForeignKey } from 'sequelize-typescript'
import Currency from '../currency/Currency'

@Table
class History extends Model {
    @AllowNull(false)
    @Column
    value: number

    @ForeignKey(() => Currency)
    @Column
    currencyId: number 
}

export default History
