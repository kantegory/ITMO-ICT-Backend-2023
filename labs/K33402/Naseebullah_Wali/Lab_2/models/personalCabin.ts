import { Table, Column, Model, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import User from './user';

@Table
class UserMeal extends Model<UserMeal> {
  @PrimaryKey
  @Column
  id!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column
  mealId!: number;
}

export default UserMeal;
