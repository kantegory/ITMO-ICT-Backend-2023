'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Платье',
        price: 7999,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Шорты',
        price: 2399,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Блузка',
        price: 2599,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Пальто',
        price: 9999,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Пиджак',
        price: 6799,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Штаны',
        price: 3399,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
