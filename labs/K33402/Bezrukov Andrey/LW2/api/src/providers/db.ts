import { Sequelize } from "sequelize-typescript";

import User from "../models/user"
import Product from "../models/product";
import Employee from "../models/employee";

const sequelize = new Sequelize({
    database: 'app',
    dialect: 'sqlite',
    storage: 'app.sqlite'
})

const models = [User, Product, Employee]
sequelize.addModels(models)

sequelize.sync()
sequelize.authenticate()

export default sequelize