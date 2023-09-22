import {Table, Model, Column, AllowNull} from "sequelize-typescript";

@Table
class TodoModel extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    description: string
}

export default TodoModel
