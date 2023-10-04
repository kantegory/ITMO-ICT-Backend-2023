import {AutoIncrement, Column, Default, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import User from "../users/User";
import Currency from "../currency/Currency";
@Table
class Portfolio extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Currency)
    @Column
    currencyId: string;

    @Default(0)
    @Column
    amount: number;
}

export default Portfolio;