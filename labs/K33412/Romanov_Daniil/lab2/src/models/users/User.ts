import {AllowNull, BeforeCreate, BeforeUpdate, Column, HasMany, Model, Table, Unique} from "sequelize-typescript";
import hashPassword from "../../utils/hashPassword";
import Wallet from "../wallets/Wallet";

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

    @HasMany(() => Wallet)
    wallets: Wallet[]

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