//lets says if we have user table in our db, so we are creating user model


const {Model, DataTypes} = require('sequelize');
const sequelize = require('./database');

class User extends Model{}
User.init({
    username: {
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'user', //table name
    timestamps: false  // for not showing timing in our table
})

module.exports = User;
