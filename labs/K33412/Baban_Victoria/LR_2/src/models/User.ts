import { Table, Column, Model, Unique, AllowNull, PrimaryKey, IsEmail, BelongsToMany } from 'sequelize-typescript'
import EventEntries from "./EventEntries";
import Event from "./Event";

@Table
class User extends Model {
    @PrimaryKey
    @Column
    id: number

    @Column
    lastName: string

    @Column
    firstName: string

    @Unique
    @AllowNull(false)
    @IsEmail
    @Column
    email: string

    @Unique
    @AllowNull(false)
    @Column
    username: string

    @AllowNull(false)
    @Column
    password: string

    @BelongsToMany(() => Event, () => EventEntries)
    events: Event[];
}

export default User
