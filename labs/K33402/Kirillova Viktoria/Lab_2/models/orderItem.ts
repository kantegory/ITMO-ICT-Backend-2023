import { Model, Column, DataType, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Product from './product';
import Order from './order';

@Table({
  tableName: 'order_items',
  timestamps: false,
})
class OrderItem extends Model<OrderItem> {
  // ...other columns and decorators...

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order_id!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  product_id!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @BelongsTo(() => Product)
  product!: Product;

  // ...other associations and methods...
}

export default OrderItem;
