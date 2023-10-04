import { Model, Column, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import User from './user';
import Competition from './competition';

@Table({
  tableName: 'judges',
  timestamps: true,
})
class Judge extends Model<Judge> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  judgeId!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User, 'userId')
  user!: User;

  @ForeignKey(() => Competition)
  @Column
  competitionId!: number;

  @BelongsTo(() => Competition, 'competitionId')
  competition!: Competition;

  // Define other columns for the judge

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  otherRelevantDetails!: string;
}

export default Judge;
