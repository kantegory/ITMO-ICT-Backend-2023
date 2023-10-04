'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Supplies', [
      {
        productId: 1,
        quantity: 20,
        dateOfSupply: new Date('2022-05-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        quantity: 5,
        dateOfSupply: new Date('2022-05-02'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        quantity: 15,
        dateOfSupply: new Date('2022-05-03'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        quantity: 35,
        dateOfSupply: new Date('2022-05-04'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        quantity: 20,
        dateOfSupply: new Date('2022-05-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        quantity: 3,
        dateOfSupply: new Date('2022-05-06'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 20,
        dateOfSupply: new Date('2022-05-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 5,
        dateOfSupply: new Date('2022-05-02'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 15,
        dateOfSupply: new Date('2022-05-03'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        quantity: 35,
        dateOfSupply: new Date('2022-05-04'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        quantity: 20,
        dateOfSupply: new Date('2022-05-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        quantity: 3,
        dateOfSupply: new Date('2022-05-06'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Supplies', null, {});
  }
};
