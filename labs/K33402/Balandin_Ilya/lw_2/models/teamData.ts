import { Model, Column, DataType, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import User from './user';
import Participant from './participant';
import Submission from './submission';
import Competition from './competition';

@Table({
  tableName: 'teams',
  timestamps: true,
})
class Team extends Model<Team> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  teamName!: string;

  // Define other columns for the team

  @ForeignKey(() => User)
  @Column
  teamLeaderId!: number;

  @ForeignKey(() => Competition)  // Specify the foreign key to the Competition table
  @Column
  competitionId!: number;

  @BelongsTo(() => User, 'teamLeaderId')
  teamLeader!: User;

  @HasMany(() => Participant)
  participants!: Participant[];

  @HasMany(() => Submission)
  submissions!: Submission[];

  @BelongsTo(() => Competition, 'competitionId')
  competition!: Competition;
}

export default Team;
