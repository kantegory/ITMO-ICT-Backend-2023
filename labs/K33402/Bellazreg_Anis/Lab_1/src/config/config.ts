import { Sequelize } from "sequelize"

// Create a new Sequelize instance with the following configuration options:
const db = new Sequelize("app", "", "", {
    storage: "./database.sqlite",
    dialect:"sqlite",
    logging: false,
})

// Export the Sequelize instance as the default export of this module
export default db;