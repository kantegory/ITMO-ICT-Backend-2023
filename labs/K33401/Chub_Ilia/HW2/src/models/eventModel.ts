import {Table, Model, Column, AllowNull, Unique} from "sequelize-typescript";

@Table
class EventModel extends Model {
    @Unique
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    description: string
}

export default EventModel
