import {AllowNull, Column, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";

@Table
class Currency extends Model {
    @PrimaryKey
    @AllowNull(false)
    @Column
    id: string;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @AllowNull(false)
    @Column
    price: number;

    @AllowNull(false)
    @Column
    date: Date;
}

export default Currency;