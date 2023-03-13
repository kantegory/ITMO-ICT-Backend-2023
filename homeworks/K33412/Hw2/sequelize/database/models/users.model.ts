import {Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript'
import { DataTypes } from 'sequelize';

@Table ({
    modelName: 'Users',
    freezeTableName: false,
})
class Users extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    username: string;

    @Column
    name: string;

    @Column({
        type: DataTypes.DATEONLY
    })
    birthday: Date;

    @Column
    password: string

    @Column
    email: string
}

export { Users };