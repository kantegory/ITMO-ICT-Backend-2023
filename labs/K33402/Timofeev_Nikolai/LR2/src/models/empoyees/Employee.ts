import { Table, Column, Model, Unique, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Warehouse from '../warehouses/Warehouse'

@Table
class Employee extends Model {
    @AllowNull(false)
    @Unique
    @Column
    name: string
    
    @AllowNull(false)
    @Column
    position: string

    @Column
    active: boolean = true
    
    @ForeignKey(() => Warehouse)
    @Column
    warehouseId: number

    @BelongsTo(() => Warehouse)
    warehouse: Warehouse;
}

export default Employee
