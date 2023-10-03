'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('UserEvents', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_event_userId_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('UserEvents', {
      fields: ['eventId'],
      type: 'foreign key',
      name: 'user_event_eventId_fk',
      references: {
        table: 'Events',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('UserEvents', 'user_event_userId_fk');
    await queryInterface.removeConstraint('UserEvents', 'user_event_eventId_fk');
  }
};
