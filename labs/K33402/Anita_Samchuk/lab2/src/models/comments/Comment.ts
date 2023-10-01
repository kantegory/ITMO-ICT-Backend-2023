import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    BeforeCreate,
    BeforeUpdate,
    ForeignKey,
    BelongsTo
} from 'sequelize-typescript';
import Post from "../posts/Post";
import {Col} from "sequelize/types/utils";
import User from "../users/User";

@Table
class Comment extends Model {
    @AllowNull(false)
    @Column
    body!: string

    @ForeignKey(() => User)
    @Column
    userId?: number;

    @BelongsTo(() => User, 'userId')
    user?: User;

    @ForeignKey(() => Post)
    @Column
    postId?: number;

    @BelongsTo(() => Post, 'postId')
    post?: Post;
}

export default Comment