import { Sequelize } from "sequelize"

const db = new Sequelize("app", "", "", {
    storage: "./db.sqlite",
    dialect:"sqlite", 
    logging: false
})

export default db;