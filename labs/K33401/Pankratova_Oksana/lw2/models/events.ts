import { Table, Model, Column, Unique, AllowNull, BelongsToMany, ForeignKey} from "sequelize-typescript"
import Place from "./place"
import Organizer from "./organizer"

@Table
class Event extends Model {
    @Unique
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @ForeignKey(() => Organizer)
    @Column
    organizer_id: number

    @AllowNull(false)
    @ForeignKey(() => Place) 
    @Column
    place_id: number

    @AllowNull(false)
    @Column
    type: string

    @AllowNull(false)
    @Column
    data: Date

  }


export default Event