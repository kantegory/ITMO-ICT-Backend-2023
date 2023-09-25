import {Model, Column, DataType, Table, BeforeCreate, BeforeUpdate, AllowNull} from 'sequelize-typescript';
import hashPassword from "../utils/hashPassword";

@Table
class User extends Model {
    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }
}

export default User;