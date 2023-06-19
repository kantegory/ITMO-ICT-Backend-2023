import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table, PrimaryKey, AutoIncrement} from 'sequelize-typescript'
import Room from '../room/Room'
import User from '../users/User'

@Table
class Booking extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @AllowNull(false)
    @Column
    arrivalDate: Date

    @AllowNull(false)
    @Column
    departureDate: Date

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Room)
    @Column
    roomId: number

    @BelongsTo(() => Room)
    room: Room

    @AllowNull(false)
    @Column
    price: number

}

export default Booking