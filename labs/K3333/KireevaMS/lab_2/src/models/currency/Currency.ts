import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript';

@Table
class Currency extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Unique
    @AllowNull(false)
    @Column
    name: string;
    }

export default Currency;
