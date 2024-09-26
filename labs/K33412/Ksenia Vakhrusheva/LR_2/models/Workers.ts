import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'Worker' })
class Worker extends Model<Worker> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @Column
  position!: string;

  @Column
  workingDays!: number;

  @Column
  workingHours!: number;
}

export default Worker;
