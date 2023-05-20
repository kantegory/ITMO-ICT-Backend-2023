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
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    price: number;
}
export default Currency;


