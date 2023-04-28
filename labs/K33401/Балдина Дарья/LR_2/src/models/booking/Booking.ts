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

    get duration(): number {
        return (this.departureDate.getTime() - this.arrivalDate.getTime()) / (1000 * 60 * 60 * 24);
      }
    async save(): Promise<this> {
        // Check that start < end
        if (this.arrivalDate >= this.departureDate) {
          throw new Error("Duration date must be greater than start date");
        }
        this.price = this.room.priceOfNight * this.duration;

    // Save changes to the database
    return super.save();
}
}

export default Booking