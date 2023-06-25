import { Table, Model, Column, ForeignKey, AllowNull} from "sequelize-typescript"
import User from './user'
import Event from './events'


@Table
class Registration extends Model {
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    UserId: number

    @AllowNull(false)
    @ForeignKey(() => Event)
    @Column
    EventId: number
  }


export default Registration