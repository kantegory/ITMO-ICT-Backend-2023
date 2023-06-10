import { Table, Column, Model, ForeignKey } from 'sequelize-typescript'
import Event from '../events/Event'

// noinspection JSAnnotator
@Table
class UserEnrolledEvent extends Model {
    @Column
    userId: number

    @ForeignKey(() => Event)
    @Column
    eventId: number
}


export default UserEnrolledEvent
