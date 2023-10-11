import {Table, Model, Column, ForeignKey} from "sequelize-typescript";
import Event from "./event.model";

@Table({indexes: [{ unique: true, fields: ['userId', 'eventId']}]})
class Registration extends Model {
    @Column
    userId: number

    @ForeignKey(() => Event)
    @Column
    eventId: number
}

export default Registration