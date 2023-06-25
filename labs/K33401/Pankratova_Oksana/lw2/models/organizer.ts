import { Table, Model, Column, Unique, AllowNull } from "sequelize-typescript"

@Table
class Organizer extends Model {
    @Unique
    @AllowNull(false)
    @Column
    declare name: string

    @AllowNull(false)
    @Column
    declare occupation: string
  }


export default Organizer