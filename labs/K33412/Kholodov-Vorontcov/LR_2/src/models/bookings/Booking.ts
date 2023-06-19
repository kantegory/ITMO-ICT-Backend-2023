import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript'
import Room from '../hotels/Room'
import User from '../users/User'

@Table
class Booking extends Model {
    @AllowNull(false)
    @Column
    dateFrom: Date

    @AllowNull(false)
    @Column
    dateTo: Date

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
}

export default Booking
