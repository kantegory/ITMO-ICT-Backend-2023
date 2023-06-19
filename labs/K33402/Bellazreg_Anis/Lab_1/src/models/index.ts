import { DataTypes, Model } from "sequelize"
import db from "../config/config";

// Define an interface for the model's attributes
interface Attributes {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
// Define a User model that extends the Sequelize Model class with the Attributes interface
class User extends Model<Attributes> {}

// Initialize the User model with its attributes and options
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