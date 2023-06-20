import { Table, Column, Model, Unique, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Warehouse from '../warehouses/Warehouse'

@Table
class Unit extends Model {
    @AllowNull(false)
    @Unique
    @Column
    title: string

    @Column
    stockAmount: number

    @ForeignKey(() => Warehouse)
    @Column
    warehouseId: number

    @BelongsTo(() => Warehouse)
    warehouse: Warehouse;
}

export default Unit
