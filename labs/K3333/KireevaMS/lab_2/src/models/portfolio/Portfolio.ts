import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    PrimaryKey,
    AutoIncrement, ForeignKey, Default,
} from 'sequelize-typescript';
import User from "../users/User";
import Currency from "../currency/Currency";

@Table
class Portfolio extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number

    @ForeignKey(() => Currency)
    @Column
    currencyId: number

    @Default(0)
    @Column
    sum: number

}
export default Portfolio;


