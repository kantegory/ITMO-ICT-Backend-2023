import { Sequelize } from "sequelize-typescript";
import User from "../models/users/User"


const sequelize = new Sequelize({
    database: 'some_db',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: console.log,
})

const models = [User]

sequelize.addModels(models)

sequelize
  .sync()
  .then(() => {
     //something here
     console.log('synced models')
  })
  .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        throw new Error('Unable to connect to the database');
    }
}

testConnection()

export default sequelize
