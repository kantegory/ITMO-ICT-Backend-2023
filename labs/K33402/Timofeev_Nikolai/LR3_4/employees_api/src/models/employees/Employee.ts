import { Table, Column, Model, Unique, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript'

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
    
    @Column
    warehouseId: number
}

export default Employee