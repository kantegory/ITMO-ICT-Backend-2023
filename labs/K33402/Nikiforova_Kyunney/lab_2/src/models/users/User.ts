import { Table, Model, Column, Unique, AllowNull, BeforeCreate, BeforeUpdate, HasMany } from 'sequelize-typescript'
import passwordHash from '../../utils/passwordHash'
import UserEvents from "../users/UserEvent"

@Table
class User extends Model {
    @Column
    firstName: string

    @Column
    lastName: string

    @Unique
    @AllowNull(false)
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @HasMany( () => UserEvents )
    eventId: UserEvents[]

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = passwordHash(password)
        }
    }
}

export default User