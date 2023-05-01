import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'
import User from '../users/User'
import Event from '../events/Event'

// noinspection JSAnnotator
@Table
class UserEnrolledEvent extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Event)
    @Column
    eventId: number
}


export default UserEnrolledEvent
