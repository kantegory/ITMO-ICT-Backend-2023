import { Model, Column, DataType, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Team from './teamData';
import Competition from './competition';

@Table({
  tableName: 'submissions',
  timestamps: true,
})
class Submission extends Model<Submission> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  submissionId!: number;

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
    type: DataType.DATE,
    allowNull: false,
  })
  submissionDateTime!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sourceCodeOrFileURL!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  evaluationScore!: number;
}

export default Submission;
