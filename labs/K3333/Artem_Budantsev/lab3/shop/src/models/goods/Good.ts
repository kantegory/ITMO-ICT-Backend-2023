import { Table, Column, Model, Unique, AllowNull, Default, DataType} from 'sequelize-typescript'
import { Min } from 'class-validator'

@Table
class Good extends Model {
    @Unique
    @Column
    name!: string; 

    @Default(0)
    @Column({
        type: DataType.INTEGER, 
        validate: {
            isInt: true
        }

    })
    @Min(0, {message: 'Count must be greater than 0'})
    count!: number; 

    @AllowNull(false)
    @Min(0, {message: 'Count must be greater than 0'})
    @Column({
        type: DataType.FLOAT
    })
    price!: number; 

}

export default Good