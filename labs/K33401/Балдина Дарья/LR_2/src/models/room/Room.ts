import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table, PrimaryKey} from 'sequelize-typescript'
import Hotel from '../hotel/Hotel'
import Booking from '../booking/Booking'


@Table
class Room extends Model {
    @AllowNull(false)
    @PrimaryKey
    @Column
    roomNumber: string

    @AllowNull(false)
    @Column
    floor: number

    @AllowNull(false)
    @Column
    capacity: number

    @AllowNull(false)
    @Column
    priceOfNight: number

    @Column
    description: string

    @ForeignKey(() => Hotel)
    @Column
    hotelId: number

    @BelongsTo(() => Hotel)
    hotel: Hotel

    @HasMany(() => Booking)
    bookings: Booking[]
}

export default Room