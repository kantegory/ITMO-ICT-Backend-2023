import { Table, Model, Column, Unique, AllowNull} from "sequelize-typescript"

@Table
class Place extends Model {
    @Unique
    @AllowNull(false)
    @Column
    declare name: string

    @AllowNull(false)
    @Column
    declare city: string

    @AllowNull(false)    
    @Column
    declare address: string
  }


export default Place