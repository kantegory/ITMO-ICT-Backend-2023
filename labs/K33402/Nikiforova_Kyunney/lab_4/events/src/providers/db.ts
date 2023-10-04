import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import Event from "../models/Event"
import EventSettings from "../models/EventSettings"

dotenv.config()

const sequelize = new Sequelize({
    database: 'some_db',
    dialect: 'sqlite',
    storage: 'dbEvents.sqlite',
    logging: console.log,
})

const models = [Event, EventSettings]
sequelize.addModels(models)

sequelize
  .sync()
  .then(() => {
     //something here
     console.log('Synced models')
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