import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    BeforeCreate,
    BeforeUpdate,
    HasMany
} from 'sequelize-typescript';

import hashPassword from "../../utils/hashPassword"
import Post from "../posts/Post";
import Comment from "../comments/Comment";

@Table
class User extends Model {
    @AllowNull(false)
    @Unique
    @Column
    username!: string

    @Unique
    @Column
    email!: string

    @AllowNull(false)
    @Column
    password!: string

    @HasMany(() => Post, {onDelete: 'CASCADE'})
    posts!: Post[]

    @HasMany(() => Comment, {onDelete: 'CASCADE'})
    comments!: Comment[]

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