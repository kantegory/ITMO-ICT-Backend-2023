'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Coins', [
            {ticker: 'btc', name: 'Bitcoin', createdAt: new Date('2012-01-01'), updatedAt: new Date('2012-01-01')},
            {ticker: 'eth', name: 'Ethereum', createdAt: new Date('2018-03-05'), updatedAt: new Date('2018-03-05')},
            {ticker: 'doge', name: 'Dogecoin', createdAt: new Date('2021-01-01'), updatedAt: new Date('2021-01-01')},
            {ticker: 'shib', name: 'Shiba Inu', createdAt: new Date('2022-01-01'), updatedAt: new Date('2022-01-01')},
            {ticker: 'sol', name: 'Solana', createdAt: new Date('2021-09-02'), updatedAt: new Date('2021-09-02')},
            {ticker: 'dot', name: 'Polkadot', createdAt: new Date('2021-05-12'), updatedAt: new Date('2021-05-12')},
            {ticker: 'ltc', name: 'Litecoin', createdAt: new Date('2022-06-05'), updatedAt: new Date('2022-06-05')}
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Coins', null, {})
    }
}
