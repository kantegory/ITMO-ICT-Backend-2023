import { DataTypes, Model } from "sequelize"
import db from "../config/config";

interface Attributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
class User extends Model<Attributes> {}

User.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
          },
          firstName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          },
    },
    {
        sequelize:db,
        tableName: "todos"
    }
)

export default User