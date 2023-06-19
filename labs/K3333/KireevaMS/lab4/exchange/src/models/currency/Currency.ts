import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    PrimaryKey,
    AutoIncrement, ForeignKey, Default,
} from 'sequelize-typescript';


@Table
class Currency extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
        // @ts-ignore
    id: number;

    @AllowNull(false)
    @Column
        // @ts-ignore
    name: string;

    @AllowNull(false)
    @Column
        // @ts-ignore
    price: number;
}
export default Currency;


