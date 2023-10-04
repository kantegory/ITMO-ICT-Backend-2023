import { Model, Column, DataType, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Order from './order';
import Product from './product';
import Employee from './employee';

@Table({
  tableName: 'sales',
  timestamps: false,
})
class Sales extends Model<Sales> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

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

  @ForeignKey(() => Employee)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  employee_id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  sale_date!: Date;

  @BelongsTo(() => Order)
  order!: Order;

  @BelongsTo(() => Product)
  product!: Product;

  @BelongsTo(() => Employee)
  employee!: Employee;
}

export default Sales;
