import { Sequelize } from "sequelize";

console.log("MODELS! Sequelize", Sequelize);

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = " TEST SQ";
// const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: "db.sqlite",
//     models: [__dirname + "/**/*.model.ts"],
//     // models: [__dirname + "/models"], // or [Player, Team],
//     // database: "some_db",
//     // username: "root",
//     // password: "",
// });

// const modelDefiners = [require("./user.model")];

// // We define all models according to their files.
// for (const modelDefiner of modelDefiners) {
//     modelDefiner(sequelize);
// }

// We export the sequelize connection instance to be used around our app.
export default sequelize;
