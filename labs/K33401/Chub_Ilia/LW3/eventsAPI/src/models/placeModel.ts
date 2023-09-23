import {Table, Model, Column, AllowNull, Unique} from "sequelize-typescript";

@Table
class PlaceModel extends Model {
    @Unique
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    address: string
}

export default PlaceModel
