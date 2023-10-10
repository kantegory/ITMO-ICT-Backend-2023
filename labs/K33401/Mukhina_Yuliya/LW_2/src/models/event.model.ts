import {Table, Column, Model, AllowNull, DataType} from 'sequelize-typescript'

enum EventType {
    CONFERENCE = 'conference',
    WORKSHOP = 'workshop',
    OTHER = 'other'
}

@Table({
    createdAt: false,
    updatedAt: false,
    indexes: [{unique: true, fields: ['title', 'type', 'date']}]
})
class Event extends Model {
    @AllowNull(false)
    @Column
    title: string

    @AllowNull(false)
    @Column
    description: string

    @Column({
        defaultValue: EventType.OTHER,
        type: DataType.ENUM(...Object.values(EventType)),
    })
    type!: EventType;

    @AllowNull(false)
    @Column({
        type: DataType.DATEONLY,
    })
    date: Date

    @AllowNull(false)
    @Column
    address: string
}

export default Event