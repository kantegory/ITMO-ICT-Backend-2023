import { Table, Column, Model, PrimaryKey, BelongsTo } from 'sequelize-typescript';


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
