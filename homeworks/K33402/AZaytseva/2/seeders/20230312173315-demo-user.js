'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'First',
        lastName: 'User',
        email: 'first@example.com',
        password: 'Testtest123',
        dob: new Date('2002-02-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Second',
        lastName: 'User',
        email: 'second@example.com',
        password: 'Testtest123',
        dob: new Date('2002-02-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Third',
        lastName: 'User',
        email: 'third@example.com',
        password: 'Testtest123',
        dob: new Date('2002-02-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
