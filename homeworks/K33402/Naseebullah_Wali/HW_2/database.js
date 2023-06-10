// sequelize instance file
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('mydb', 'userNameOfMyDb','passOfMyDb',{
    dialect: 'sqlite', 
    //this is dialect opton can be different such as postgressSql or others 
    host: './dev.sqlite' 
    //file where my data will be saving another option can be :memory: this is used to save in memory but it will be deleted after every restart
});
module.exports = sequelize;
