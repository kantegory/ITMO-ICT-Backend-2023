import { Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, HasMany } from 'sequelize-typescript'
import hashPassword from '../../utils/hashPassword'
import Booking from '../bookings/Booking'

@Table
class User extends Model {
    @AllowNull(false)
    @Column
    firstName: string

    @AllowNull(false)
    @Column
    lastName: string

    @AllowNull(false)
    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @AllowNull(false)
    @Column
    passportSeries: string

    @AllowNull(false)
    @Column
    passportNumber: string

    @Column
    bio: string

    @HasMany(() => Booking)
    bookings: Booking[]

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }
}

export default User
