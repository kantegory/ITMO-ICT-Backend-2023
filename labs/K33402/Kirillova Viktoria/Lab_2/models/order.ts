import { Model, Column, DataType, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import User from './user';
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
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    user_id!: number;
  
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    order_date!: Date;
  
    @BelongsTo(() => User)
    user!: User;
  
    @HasMany(() => OrderItem)
    orderItems!: OrderItem[];
  }

  export default Order;