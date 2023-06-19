import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface User {
    id: number;
    name: string;
    surname: string;
    middlename:string;
    email: string;
    username: string;
    password: string;
};

interface UserCreation
    extends Optional<User, 'id'> { }

interface UserInstance
    extends Model<User, UserCreation>,
    User {
    createdAt?: Date;
    updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(
    'User',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            unique: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        surname: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        middlename: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        email: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        username: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        password: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
    }
);

export default User 