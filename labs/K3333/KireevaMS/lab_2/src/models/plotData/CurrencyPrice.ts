import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    PrimaryKey,
    AutoIncrement, ForeignKey, Default,
} from 'sequelize-typescript';

import Currency from "../currency/Currency";

@Table
class CurrencyPrice extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @ForeignKey(() => Currency)
    @Column
    currencyId: number

    @AllowNull(false)
    @Column
    price: number;
}
export default CurrencyPrice;


