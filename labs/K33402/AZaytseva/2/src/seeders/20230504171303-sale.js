'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Sales', [
      {
        productId: 1,
        quantity: 2,
        price: 7999 * 2,
        dateOfSale: new Date('2022-05-02'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        quantity: 1,
        price: 7999 * 1,
        dateOfSale: new Date('2022-05-03'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        quantity: 4,
        price: 7999 * 4,
        dateOfSale: new Date('2022-05-04'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        quantity: 10,
        price: 7999 * 10,
        dateOfSale: new Date('2022-05-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 1,
        quantity: 5,
        price: 7999 * 5,
        dateOfSale: new Date('2022-05-06'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 2,
        price: 2399 * 2,
        dateOfSale: new Date('2022-05-02'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 5,
        price: 2399 * 5,
        dateOfSale: new Date('2022-05-03'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 5,
        price: 2399 * 5,
        dateOfSale: new Date('2022-05-05'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 3,
        price: 2399 * 3,
        dateOfSale: new Date('2022-05-08'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Sales', null, {});
  }
};
