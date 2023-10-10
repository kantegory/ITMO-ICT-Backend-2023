import {Table, Model, Column, ForeignKey} from "sequelize-typescript";
import Event from "./event.model";
import User from "./user.model";

@Table({indexes: [{ unique: true, fields: ['userId', 'eventId']}]})
class Registration extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Event)
    @Column
    eventId: number
}

export default Registration