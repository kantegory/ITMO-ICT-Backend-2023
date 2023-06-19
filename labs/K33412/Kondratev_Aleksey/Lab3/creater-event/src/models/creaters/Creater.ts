import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
class Creater extends Model {
    @AllowNull(false)
    @Unique
    @Column
    passport: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    surname: string;
}

export default Creater;