import {Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate, CreatedAt} from 'sequelize-typescript';

import hashPassword from "../../utils/hashPassword"

@Table
class User extends Model {
    @Column
    firstName!: string;

    @Column
    lastName!: string;

    @Column
    patronymic?: string

    @Unique
    @Column
    username!: string;

    @Unique
    @Column
    email!: string;

    @AllowNull(false)
    @Column
    password!: string;

    @CreatedAt
    creationDate!: Date;

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const {password} = instance

        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }
}

export default User