import { Table, Model, Column, Unique, AllowNull, ForeignKey} from "sequelize-typescript"
import User from './user'

@Table
class RefreshToken extends Model {
    @Unique
    @AllowNull(false)
    @Column
    declare token: string

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    declare user_id: number

  }

export default RefreshToken