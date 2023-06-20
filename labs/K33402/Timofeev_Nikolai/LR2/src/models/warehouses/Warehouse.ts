import { Table, Column, Model, Unique, AllowNull, HasMany, BeforeCreate, BeforeUpdate } from 'sequelize-typescript'
import Unit from '../units/Unit'
import Employee from '../empoyees/Employee'

@Table
class Warehouse extends Model {
    @Column
    title: string

    @Column
    address: string

    @HasMany(() => Unit)
    units: Unit[]

    @HasMany(() => Employee)
    employees: Employee[]
}

export default Warehouse
