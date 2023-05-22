import { AllowNull, Column,Model, Table, PrimaryKey, AutoIncrement} from 'sequelize-typescript'

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

    @AllowNull(false)
    @Column
    userId: number

    @AllowNull(false)
    @Column
    roomNumber: number

    @AllowNull(false)
    @Column
    price: number

}

export default Booking