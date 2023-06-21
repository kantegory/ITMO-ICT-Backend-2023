import { Table, Column, Model, Unique, AllowNull, HasMany, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import Unit from '../units/Unit'

@Table
class Warehouse extends Model {
    @Column
    title: string

    @Column
    address: string

    @HasMany(() => Unit)
    units: Unit[]
}

export default Warehouse
