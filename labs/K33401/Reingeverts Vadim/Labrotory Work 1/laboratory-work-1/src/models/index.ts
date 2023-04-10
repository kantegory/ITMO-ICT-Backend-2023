import { Sequelize } from "sequelize-typescript";
import { Person } from "./person.model";

console.log("Sequelize", Sequelize);
console.log("Person", Person);

const sequelize = new Sequelize({
    database: "some_db",
    dialect: "sqlite",
    username: "root",
    password: "",
    storage: ":memory:",
    // models: [__dirname + "/**/*.model.ts"],
    models: [Person],
});

export default sequelize;
