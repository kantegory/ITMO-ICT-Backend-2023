import { Model, Column, DataType, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import OrderItem from './orderItem';

@Table({
    tableName: 'products',
    timestamps: false,
  })
  class Product extends Model<Product> {
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    id!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    model!: string;
  
    @Column({
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    })
    price!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    description!: string;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    quantity_in_stock!: number;
  
    @HasMany(() => OrderItem, 'product_id')
    orderItems!: OrderItem[];
  }


  export default Product;