import { DataTypes, Model } from "sequelize"
import db from "../configs/config";
import User from "./user";
import Event from "./event";

interface Attributes {
    id: string;
    UserId: string;
    EventId: string;
  }
class Attendance extends Model<Attributes> {}

Attendance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          UserId: {
            type: DataTypes.UUIDV4, references: {
              model: 'Users',
              key: 'id'
            },
            allowNull: false
          },
          EventId: {
            type: DataTypes.UUIDV4,
            references: {
                model: 'Events',
                key: 'id'
            },
            allowNull: false
          }
    },
    {
        sequelize:db,
        tableName: "Attendance"
    }
)
User.hasMany(Attendance)
Event.hasMany(Attendance)
export default Attendance