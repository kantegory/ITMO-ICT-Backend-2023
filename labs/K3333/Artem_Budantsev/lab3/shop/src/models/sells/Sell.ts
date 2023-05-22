import { Table, Column, Model, Default, DataType, ForeignKey, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import Good from '../goods/Good'
import { Min } from 'class-validator'

@Table
class Sell extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: number;


    @ForeignKey(() => Good)
    @Column
    goodId!: number; 

    @Default(1)
    @Min(1, {message: 'Count must be greater than 0'})
    @Column
    count!: number; 

    @Column({
        type: DataType.FLOAT
    })
    price!: number; 
}

export default Sell