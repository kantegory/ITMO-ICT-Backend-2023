import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './Product';


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

 
  @Column
  userID!: number;


  @Column
  rating!: number;

  @Column
  comment!: string;
}

export default Review;
