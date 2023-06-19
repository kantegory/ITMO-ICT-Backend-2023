import { Model, Column, DataType, Table, BeforeCreate, BeforeUpdate, HasMany } from 'sequelize-typescript';
import { hashPassword } from '../utils/password';


@Table({
  tableName: 'users',
  timestamps: true,
})
class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  token!: string;

  @BeforeCreate
  @BeforeUpdate
  static generatePasswordHash(instance: User) {
    const { password } = instance;

    if (instance.changed('password')) {
      instance.password = hashPassword(password);
    }
  }


}

export default User;
