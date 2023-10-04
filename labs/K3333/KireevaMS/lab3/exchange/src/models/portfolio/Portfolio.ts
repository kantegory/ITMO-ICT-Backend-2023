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
class Portfolio extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
        // @ts-ignore
    id: number;


    @Column
        // @ts-ignore
    userId: number

    @ForeignKey(() => Currency)
    @Column
        // @ts-ignore
    currencyId: number

    @Default(0)
    @Column
        // @ts-ignore
    sum: number

}
export default Portfolio;


