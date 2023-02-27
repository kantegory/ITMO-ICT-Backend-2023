const app = require("./app");
const sequelize = require("../models");
const port = process.env.PORT.trim() || 3000;

const assertDatabaseConnectionOk = async () => {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log("Database connection OK!");
    } catch (error) {
        console.log("Unable to connect to the database:");
        console.log(error.message);
        process.exit(1);
    }
};

// {} - Creates the table if it doesn't exist (and does nothing if it already exists)
// { force: true } - Creates the table, dropping it first if it already existed
// { alter: true } - Checks what is the current state of the table in the database
//                   (which columns it has, what are their data types, etc), and then
//                   performs the necessary changes in the table to make it match the model.
const syncDatabase = async () => {
    console.log("Database force synced!");
    await sequelize.sync({ force: true });
};

const init = async () => {
    await assertDatabaseConnectionOk();
    await syncDatabase();

    console.log(`Starting Sequelize + Express example on port ${port}...`);

    app.listen(port, () => {
        console.log(`Express server started on port ${port}.`);
    });
};

init();
