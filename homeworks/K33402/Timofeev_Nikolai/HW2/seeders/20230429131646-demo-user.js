'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'timofeev41',
      firstName: 'Nikolas',
      lastName: 'Timofeev',
      email: 'timofeevnik41@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
