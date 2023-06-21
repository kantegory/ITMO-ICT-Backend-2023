import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import Unit from "../units/Unit";
import Employee from "../empoyees/Employee";

@Table
class Deal extends Model {
  @AllowNull(false)
  @Column
  amount: number;

  @AllowNull(false)
  @ForeignKey(() => Unit)
  @Column
  unitId: number;
  
  @AllowNull(false)
  @ForeignKey(() => Employee)
  @Column
  employeeId: number

  @BelongsTo(() => Unit)
  unit: Unit;

  @BelongsTo(() => Employee)
  employee: Employee;
}

export default Deal;
