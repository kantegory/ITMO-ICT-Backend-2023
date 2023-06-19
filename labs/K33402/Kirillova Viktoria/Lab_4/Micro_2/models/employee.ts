import { Model, Column, DataType, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';




@Table({
    tableName: 'employees',
    timestamps: false,
  })
  class Employee extends Model<Employee> {
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
    first_name!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    last_name!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    email!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    position!: string;
  
    // Other employee properties
  }


  export default Employee;