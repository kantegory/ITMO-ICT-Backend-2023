'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EventType.hasMany(models.Event, { foreignKey: 'eventTypeId' });
    }
  }
  EventType.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EventType',
  });
  return EventType;
};