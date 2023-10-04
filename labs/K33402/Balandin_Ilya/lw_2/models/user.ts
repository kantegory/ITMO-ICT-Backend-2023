import { Model, Column, DataType, Table, HasMany, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import Team from './teamData';
import Participant from './participant';
import Judge from './judge';
import hashPassword from '../utils/hashPassword';

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

  @HasMany(() => Team)
  teams!: Team[];

  @HasMany(() => Participant)
  participants!: Participant[];

  @HasMany(() => Judge)
  judges!: Judge[];
}

export default User;
