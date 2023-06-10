import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';
import { Min } from 'class-validator'

@Table
class Staff extends Model {
    @AllowNull(false)
    @Column
    firstName!: string;

    @AllowNull(false)
    @Column
    lastName!: string; 

    @Column
    position!: string; 

    @Min(0, {message: 'Count must be greater than 0'})
    @Column({
        type: DataType.FLOAT
    })
    salary!: number;
}

export default Staff