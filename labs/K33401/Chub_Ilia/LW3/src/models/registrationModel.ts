import {Table, Model, Column, AllowNull, ForeignKey} from "sequelize-typescript";
import UserModel from "./userModel";
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
    @ForeignKey(() => UserModel)
    @Column
    userId: number

    @ForeignKey(() => EventModel)
    @Column
    eventId: number
}

export default RegistrationModel
