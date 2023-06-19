import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import Hotel from './Hotel'
import Booking from '../bookings/Booking'

@Table
class Room extends Model {
    @AllowNull(false)
    @Column
    number: string

    @AllowNull(false)
    @Column
    floor: number

    @AllowNull(false)
    @Column
    capacity: number

    @AllowNull(false)
    @Column
    price: number

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
