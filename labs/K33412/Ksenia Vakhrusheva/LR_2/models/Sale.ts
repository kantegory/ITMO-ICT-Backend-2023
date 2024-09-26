import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './Product';
import Worker from './Workers';

@Table({ tableName: 'Sale' })
class Sale extends Model<Sale> {
  @PrimaryKey
  @AutoIncrement
  @Column
  saleID!: number;

  @ForeignKey(() => Product)
  @Column
  productID!: number;

  @BelongsTo(() => Product)
  product!: Product;

  @ForeignKey(() => Worker)
  @Column
  workerID!: number;

  @BelongsTo(() => Worker)
  worker!: Worker;

  @Column
  saleDate!: Date;

  @Column
  quantity!: number;
}

export default Sale;
