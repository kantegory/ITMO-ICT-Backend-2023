import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo } from "sequelize-typescript";
import Unit from "../units/Unit";

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
  @Column
  employeeId: number

  @BelongsTo(() => Unit)
  unit: Unit;
}

export default Deal;
