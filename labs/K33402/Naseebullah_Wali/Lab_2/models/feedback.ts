import { Table, Column, Model, ForeignKey, PrimaryKey, BelongsTo } from 'sequelize-typescript';
import User from '../models/user';

@Table
class feedback extends Model<feedback> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  email!:string;

  @Column
  subject!:string;

  @Column
  message!: string; 
}

export default feedback;
