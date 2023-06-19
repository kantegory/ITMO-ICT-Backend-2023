import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, DeletedAt, BelongsToMany, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import Ingredient from '../models/ingredients'
import Meal from '../models/mealDb'

@Table({ tableName: 'meal_ingredients' })
class MealIngredient extends Model<MealIngredient> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Meal)
  @Column
  meal_id!: number;

  @ForeignKey(() => Ingredient)
  @Column
  ingredient_id!: number;

  @BelongsTo(() => Meal)
  meal!: Meal;

  @BelongsTo(() => Ingredient)
  ingredient!: Ingredient;

  @Column
  quantity!: string;

  @Column
  unit!: string;
}


export default MealIngredient;