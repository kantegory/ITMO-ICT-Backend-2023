'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.belongsToMany(models.User, {
        through: 'UserEvent',
        foreignKey: 'eventId',
      });
      Event.belongsTo(models.EventType, { foreignKey: 'eventTypeId' });
    }
  }
  Event.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    date: DataTypes.DATE,
    eventTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};