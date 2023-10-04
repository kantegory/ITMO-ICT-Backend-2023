'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Polina',
      surname: 'Savinova',
      middlename:'Andreevna',
      email: '@polisavgmail.com',
      username: 'polisav',
      password: 'crazygirl',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Galina',
      surname: 'Vasnetsova',
      middlename: 'Dmitrievna',
      email: 'papinadochka@gmail.com',
      username: 'galyav',
      password: 'nerdgirl',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Alexander',
      surname: 'Rybakov',
      middlename: 'Lvovich',
      email: '@alexrybgmail.com',
      username: 'sasharybka',
      password: 'crazyboy',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Boris',
      surname: 'Konovalov',
      middlename: 'Alexandrovich',
      email: '@gmail.com',
      username: 'boryanakone',
      password: 'nerdboy',
      createdAt: new Date(),
      updatedAt: new Date()
    },

  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};