'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER
            },
            username: Sequelize.DataTypes.STRING,
            email: {
                type: Sequelize.DataTypes.STRING,
                unique: true
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};
