'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Coins', [
      {ticker: 'btc', name: 'Bitcoin', createdAt: new Date('2009-01-03'), updatedAt: new Date('2021-09-12')},
      {ticker: 'eth', name: 'Ethereum', createdAt: new Date('2015-07-30'), updatedAt: new Date('2023-08-12')},
      {ticker: 'sol', name: 'Solana', createdAt: new Date('2020-03-20'), updatedAt: new Date('2020-08-12')},
      {ticker: 'dot', name: 'Polkadot', createdAt: new Date('2020-05-26'), updatedAt: new Date('2021-08-12')},
      {ticker: 'ada', name: 'Cardano', createdAt: new Date('2017-09-29'), updatedAt: new Date('2023-06-10')},
      {ticker: 'xrp', name: 'Ripple', createdAt: new Date('2012-08-05'), updatedAt: new Date('2021-12-22')}
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Coins', null, {})
  }
}