/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'First',
        surname: 'User',
        email: 'first@example.com',
        info: 'FirstFirstFirst',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Second',
        surname: 'User',
        email: 'second@example.com',
        info: 'SecondSecondSecond',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Third',
        surname: 'User',
        email: 'third@example.com',
        info: 'ThirdThirdThird',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};