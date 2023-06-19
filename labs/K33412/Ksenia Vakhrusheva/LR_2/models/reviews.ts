import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './Product';
import User from './user';

@Table({ tableName: 'reviews' })
class Review extends Model<Review> {
  @PrimaryKey
  @AutoIncrement
  @Column
  reviewID!: number;

  @ForeignKey(() => Product)
  @Column
  productID!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @ForeignKey(() => User)
  @Column
  userID!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column
  rating!: number;

  @Column
  comment!: string;
}

export default Review;
