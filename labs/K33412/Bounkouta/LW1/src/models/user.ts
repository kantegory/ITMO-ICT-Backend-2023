import {DataTypes, Model, Optional} from 'sequelize';
import { sequelize } from '.';

interface UserAttributes {
  username: string;
  password: string;
  email: string;
  hometown: string;
}
interface UserCreationAttributes
    extends Optional<UserAttributes, 'email'> { }

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}

const User = sequelize.define<UserInstance>( 
    'User', 
        { 
          username: { 
            type: DataTypes.STRING, 
          }, 
          password: {
            type: DataTypes.STRING, 
          },
          email: {
            type: DataTypes.STRING,
          }, 
          hometown: {
            type: DataTypes.STRING,
          }
        }
);

export default User