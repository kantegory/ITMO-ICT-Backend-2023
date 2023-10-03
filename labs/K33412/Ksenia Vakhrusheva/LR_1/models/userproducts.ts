import { Table, Column, Model, Unique,ForeignKey  } from 'sequelize-typescript'
import User from './user'



@Table
class Products extends Model {
    @Column
    Proname: string

    @Unique
    @Column
    ProNum: string

    @Column
    ProDes: string

    @Column
    ProCost: number

    @ForeignKey(() => User)
    @Column
    userId: number 

    
}

export default Products