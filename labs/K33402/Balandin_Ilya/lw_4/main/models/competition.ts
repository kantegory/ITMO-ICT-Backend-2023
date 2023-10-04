import { Model, Column, DataType, Table, HasMany } from 'sequelize-typescript';
import Team from './teamData';
import Participant from './participant';
import Submission from './submission';
import Judge from './judge';

@Table({
  tableName: 'competitions',
  timestamps: true,
})
class Competition extends Model<Competition> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate!: Date;

  // Define other columns for the competition

  @HasMany(() => Team)
  teams!: Team[];

  @HasMany(() => Participant)
  participants!: Participant[];

  @HasMany(() => Submission)
  submissions!: Submission[];

  @HasMany(() => Judge)
  judges!: Judge[];
}

export default Competition;
