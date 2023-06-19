import * as dotenv from "dotenv";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./data/database.db",
  synchronize: true,
  logging: false,
  entities: ["dist/entity/*.js"],
  migrations: ["dist/migration/*.js"]
})