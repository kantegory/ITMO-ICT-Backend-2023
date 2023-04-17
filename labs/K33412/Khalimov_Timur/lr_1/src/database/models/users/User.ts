import {AllowNull, BeforeCreate, BeforeUpdate, Column, Model, PrimaryKey, Table, Unique} from 'sequelize-typescript'
import hashPassword from '../../../utils/hashPassword'
import {DataTypes} from "sequelize";

@Table
class User extends Model {

    @PrimaryKey
    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    firstName: string

    @AllowNull(false)
    @Column
    lastName: string

    @AllowNull(false)
    @Column
    password: string

    @AllowNull
    @Column({
        type: DataTypes.DATEONLY
    })
    birthday: Date;
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