import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, BelongsToMany, HasMany, BelongsTo } from 'sequelize-typescript';
import Ingredient from '../models/ingredients'
import MealIngredient from '../models/MealIngredients'

@Table({ tableName: 'meals' })
class Meal extends Model<Meal> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({ unique: true })
  mealName!: string;

  @Column
  mealImage!: string;

  @Column
  instructions!: string;

  @BelongsToMany(() => Ingredient, () => MealIngredient)
  ingredients!: Ingredient[];

  @HasMany(() => MealIngredient)
  mealIngredients!: MealIngredient[];
}


export default Meal;
