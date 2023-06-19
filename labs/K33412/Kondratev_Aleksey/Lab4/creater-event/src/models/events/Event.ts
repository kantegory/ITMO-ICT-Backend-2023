import { AllowNull, Column, Model, Table, Unique, ForeignKey } from 'sequelize-typescript'
import Creater from '../creaters/Creater'

@Table
class Event extends Model {
    @AllowNull(false)
    @Unique
    @Column
    name: string

    @AllowNull(false)
    @Column
    category: string

    @AllowNull(false)
    @Column
    place: string

    @AllowNull(false)
    @Column
    price: number

    @ForeignKey(() => Creater)
    @Column
    createrId: number
}

export default Event