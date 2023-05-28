import { Table, Column, Model, PrimaryKey, BelongsTo } from 'sequelize-typescript';

@Table
class UserMeal extends Model<UserMeal> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  userId!: number;

  @Column
  mealId!: number;
}

export default UserMeal;
