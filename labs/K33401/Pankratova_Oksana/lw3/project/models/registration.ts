import { Table, Model, Column, ForeignKey, AllowNull} from "sequelize-typescript"
import Event from './events'


@Table
class Registration extends Model {
    @AllowNull(false)
    @Column
    userId: number

    @AllowNull(false)
    @ForeignKey(() => Event)
    @Column
    eventId: number
  }


export default Registration