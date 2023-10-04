'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Coins', [
            {ticker: 'btc', name: 'Bitcoin', createdAt: new Date('2022-11-21'), updatedAt: new Date('2023-11-21')},
            {ticker: 'eth', name: 'Ethereum', createdAt: new Date('2023-07-15'), updatedAt: new Date('2023-07-15')},
            {ticker: 'doge', name: 'Dogecoin', createdAt: new Date('2023-01-01'), updatedAt: new Date('2023-01-01')},
            {ticker: 'shib', name: 'Shiba Inu', createdAt: new Date('2023-02-02'), updatedAt: new Date('2023-02-02')},
            {ticker: 'sol', name: 'Solana', createdAt: new Date('2023-05-02'), updatedAt: new Date('2023-05-02')},
            {ticker: 'dot', name: 'Polkadot', createdAt: new Date('2023-04-11'), updatedAt: new Date('2023-04-11')},
            {ticker: 'ltc', name: 'Litecoin', createdAt: new Date('2023-01-13'), updatedAt: new Date('2023-01-13')}
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Coins', null, {})
    }
}
