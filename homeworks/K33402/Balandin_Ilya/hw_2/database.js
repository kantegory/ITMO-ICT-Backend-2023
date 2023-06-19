// sequelize instance file
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('database1', 'userName1','password1',{
    dialect: 'sqlite', 
    host: './dev.sqlite' 
});
module.exports = sequelize;
