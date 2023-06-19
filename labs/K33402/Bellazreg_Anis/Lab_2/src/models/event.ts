import { DataTypes, Model } from "sequelize"
import db from "../configs/config";
interface Attributes {
    id: string;
    name: string;
    description: string;
    location: string;
    time: Date;
    date: Date;
  }
class Event extends Model<Attributes> {}

Event.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false
          },
          location: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          time: {
            type: DataTypes.TIME,
            allowNull: false
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false
          }
    },
    {
        sequelize:db,
        tableName: "Events"
    }
)

export default Event
