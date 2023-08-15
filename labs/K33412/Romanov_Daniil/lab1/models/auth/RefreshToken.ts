import {AllowNull, Column, ForeignKey, Model, Table, Unique} from "sequelize-typescript";
import User from "../users/User";

@Table
class RefreshToken extends Model {
    @Unique
    @AllowNull(false)
    @Column
    token: string

    @ForeignKey(() => User)
    @Column
    userId: number
}

export default RefreshToken