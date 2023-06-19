import {Table, Model, Column, BelongsTo, AllowNull, ForeignKey } from 'sequelize-typescript'
import User from "./User"
import Event from "../events/Event"

@Table
class UserEvent extends Model {
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Event)
    @AllowNull(false)
    @Column
    eventId: number
}

export default UserEvent