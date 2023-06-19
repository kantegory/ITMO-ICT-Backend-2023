import {AutoIncrement, Column, Default, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import Currency from "../currency/Currency";
@Table
class Portfolio extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

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