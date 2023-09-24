import {Table, Model, Column, AllowNull, ForeignKey} from "sequelize-typescript";
import EventModel from "./eventModel";

@Table(
    { 
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['userId', 'eventId']
            }
        ]
    }
)
class RegistrationModel extends Model {
    @AllowNull(false)
    @Column
    userId: number

    @ForeignKey(() => EventModel)
    @Column
    eventId: number
}

export default RegistrationModel
