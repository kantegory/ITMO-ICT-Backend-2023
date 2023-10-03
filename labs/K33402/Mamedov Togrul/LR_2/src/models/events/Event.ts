import {Table, Column, Model, Unique, AllowNull} from 'sequelize-typescript'


// noinspection JSAnnotator
@Table
class Event extends Model {
    @Unique
    @AllowNull(false)
    @Column
    title: string

    @AllowNull(false)
    @Column
    address: string

    @AllowNull(false)
    @Column
    district: string

    @AllowNull(false)
    @Column
    ev_type: string

    @AllowNull(false)
    @Column
    date: string

    @AllowNull(false)
    @Column
    short_description: string

    @AllowNull(false)
    @Column
    full_description: string

    @Column
    website: string
}


export default Event
