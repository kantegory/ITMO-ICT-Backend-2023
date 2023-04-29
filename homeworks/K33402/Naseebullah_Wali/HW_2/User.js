//lets says if we have user table in our db, so we are creating user model


const {Model, DataTypes} = require('sequelize');
const sequelize = require('./database');

class User extends Model{}


//here initilizing the user and it takes to two parameters
// entities of db and second our database name
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
    modelName: 'user', // this is to give name to our db tabel
    timestamps: false  // for not showing timing in our table
})

module.exports = User;
