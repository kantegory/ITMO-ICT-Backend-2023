import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, BelongsToMany, HasMany, BelongsTo } from 'sequelize-typescript';
import MealIngredient from '../models/MealIngredients'
import Meal from '../models/mealDb'


@Table({ tableName: 'ingredients' })
class Ingredient extends Model<Ingredient> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @BelongsToMany(() => Meal, () => MealIngredient)
  meals!: Meal[];

  @HasMany(() => MealIngredient)
  mealIngredients!: MealIngredient[];
}

export default Ingredient;