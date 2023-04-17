import * as dotenv from "dotenv";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: String(process.env.DB_HOST),
  port: parseInt(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  synchronize: false,
  logging: false,
  entities: ["dist/entity/*.js"],
  migrations: ["dist/migration/*.js"]
})