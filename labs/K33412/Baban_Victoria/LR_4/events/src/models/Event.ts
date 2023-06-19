import {Table, Column, Model, AllowNull, PrimaryKey, IsDate} from 'sequelize-typescript'

@Table
class Event extends Model {
    @PrimaryKey
    @Column
    id: number

    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    category: string

    @AllowNull(false)
    @Column
    place: string

    @IsDate
    @AllowNull(false)
    @Column
    date: Date

    @AllowNull(false)
    @Column
    price: string

    @AllowNull(false)
    @Column
    district: string

    @Column
    description: string

    @Column
    contact_number: string

    @Column
    contact_name: string

}

export default Event
