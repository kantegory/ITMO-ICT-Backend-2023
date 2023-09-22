import {Table, Model, Column, AllowNull, Unique, ForeignKey} from "sequelize-typescript";
import EventTypeModel from "./eventTypeModel";
import PlaceModel from "./placeModel";

@Table
class EventModel extends Model {
    @Unique
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    description: string

    @AllowNull(false)
    @Column
    date: Date

    @ForeignKey(() => EventTypeModel)
    @Column
    eventTypeId: number

    @ForeignKey(() => PlaceModel)
    @Column
    placeId: number
}

export default EventModel
