import { DataTypes, Model } from "sequelize"
import db from "../configs/config";
interface Attributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

  }
class User extends Model<Attributes> {
}

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
          password: {
            type: DataTypes.STRING,
            allowNull: false
          }
    },
    {
        sequelize:db,
        tableName: "Users"
    }
)

export default User