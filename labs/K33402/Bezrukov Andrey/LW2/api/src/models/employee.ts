import { Table, Model, Column, PrimaryKey, AllowNull} from "sequelize-typescript"

@Table
class Employee extends Model {
    @PrimaryKey
    @Column
    id: number

    @AllowNull(false)
    @Column
    firstName: string

    @AllowNull(false)
    @Column
    lastName: string
    
    @AllowNull(false)
    @Column
    position: string
}

export default Employee