'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'First',
        last_name: 'User',
        email: 'first@example.com',
        phone: '+11111111111',
        password: 'Testoviy1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        first_name: 'Second',
        last_name: 'User',
        email: 'second@example.com',
        phone: '+22222222222',
        password: 'Testoviy2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};