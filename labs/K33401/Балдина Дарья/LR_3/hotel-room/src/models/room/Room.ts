import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table, PrimaryKey} from 'sequelize-typescript'
import Hotel from '../hotel/Hotel'


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
}

export default Room