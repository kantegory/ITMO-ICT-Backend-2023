import { AllowNull, Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
class Worker extends Model {
  @AllowNull(false)
  @Unique
  @Column
  passport: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  position: string;

  @AllowNull(false)
  @Column
  salary: number;
}

export default Worker;
