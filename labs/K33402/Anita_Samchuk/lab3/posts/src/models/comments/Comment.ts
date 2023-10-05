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

@Table
class Comment extends Model {
    @AllowNull(false)
    @Column
    body!: string

    @AllowNull(false)
    @Column
    userId?: number

    @ForeignKey(() => Post)
    @Column
    postId?: number

    @BelongsTo(() => Post, {onDelete: 'CASCADE'})
    post?: Post
}

export default Comment