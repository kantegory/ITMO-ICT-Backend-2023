import { Model, Column, DataType, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import OrderItem from './orderItem';

@Table({
    tableName: 'orders',
    timestamps: false,
  })
  class Order extends Model<Order> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id!: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      field: 'user_id',
    })
    user_id!: number;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
      field: 'order_date',
    })
    order_date!: Date;

  
    @HasMany(() => OrderItem)
    orderItems!: OrderItem[];
  }

  export default Order;