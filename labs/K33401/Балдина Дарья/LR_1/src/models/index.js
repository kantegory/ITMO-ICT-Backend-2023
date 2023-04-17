import { Sequelize } from 'sequelize';
// eslint-disable-next-line
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line
const config = require(__dirname + '/../config/config.js')[env];

const  sequelize = config.url
    ? new Sequelize(config.url, config)
    : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };
