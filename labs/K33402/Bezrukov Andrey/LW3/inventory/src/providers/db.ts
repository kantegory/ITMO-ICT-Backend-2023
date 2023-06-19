import { Sequelize } from "sequelize-typescript";

import User from "../models/user"
import Product from "../models/product";

const sequelize = new Sequelize({
    database: 'app',
    dialect: 'sqlite',
    storage: 'app.sqlite'
})

const models = [User, Product]
sequelize.addModels(models)

sequelize.sync()
sequelize.authenticate()

export default sequelize