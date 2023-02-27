const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const saltRounds = 8;

module.exports = (sequelize) => {
    sequelize.define(
        "User",
        {
            // Default id
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(password) {
                    const hashedPassword = bcrypt.hashSync(password, saltRounds);
                    this.setDataValue("password", hashedPassword);
                },
                validate: {
                    // We require password to have length of at least 8, and
                    // only use letters, numbers and underscores.
                    // is: /^\w{8,}$/,
                },
            },
            firstName: {
                type: DataTypes.STRING,
            },
            lastName: {
                type: DataTypes.STRING,
            },
        },
        {
            instanceMethods: {
                hashPassword(password) {
                    return bcrypt.hash(password, saltRounds);
                },
                comparePassword(password) {
                    return bcrypt.compare(password, this.password);
                },
            },

            // To disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            // freezeTableName: true,
        }
    );
};
