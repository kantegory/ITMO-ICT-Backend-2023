'use strict';

const crypto = require('crypto');

const {
    Model
} = require('sequelize');

function encodePassword(password, salt) {
    return crypto.createHash('sha256').update(password + salt).digest('base64');
}

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    User.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            set(value) {
                // Store hash generated from raw password and salt
                this.setDataValue('password', encodePassword(value, this.salt));
            }
        },
        salt: DataTypes.STRING
    }, {
        defaultScope: {
            // Do not return salt and password
            attributes: {exclude: ['password', 'salt']},
        },
        hooks: {
            beforeCreate: (instance, options) => {
                instance.salt = crypto.randomBytes(16).toString('base64');
            }
        },
        sequelize,
        modelName: 'User',
    });
    return User;
};
