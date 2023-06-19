import { Model, Column, ForeignKey, Table, BelongsTo, DataType } from 'sequelize-typescript';
import User from './user';
import Team from './teamData';
import Competition from './competition';

@Table({
  tableName: 'participants',
  timestamps: true,
})
class Participant extends Model<Participant> {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User, 'userId')
  user!: User;

  @ForeignKey(() => Team)
  @Column
  teamId!: number;

  @BelongsTo(() => Team, 'teamId')
  team!: Team;

  @ForeignKey(() => Competition)
  @Column
  competitionId!: number;

  @BelongsTo(() => Competition, 'competitionId')
  competition!: Competition;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role!: string;
}

export default Participant;
