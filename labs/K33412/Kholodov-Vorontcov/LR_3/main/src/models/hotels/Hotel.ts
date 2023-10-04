import { AllowNull, Column, HasMany, Model, Table } from 'sequelize-typescript'
import Room from './Room'

@Table
class Hotel extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    city: string

    @AllowNull(false)
    @Column
    stars: number

    @HasMany(() => Room)
    rooms: Room[]
}

export default Hotel
