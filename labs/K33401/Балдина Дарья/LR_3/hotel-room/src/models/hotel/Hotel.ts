import { Table, Column, Model, HasMany, Unique, AllowNull, PrimaryKey, AutoIncrement} from 'sequelize-typescript'
import Room from '../room/Room'

@Table
class Hotel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @AllowNull(false)
    @Unique
    @Column
    name: string

    @AllowNull(false)
    @Column
    address: string

    @AllowNull(false)
    @Column
    stars: number

    @HasMany(() => Room)
    rooms: Room[]
}

export default Hotel