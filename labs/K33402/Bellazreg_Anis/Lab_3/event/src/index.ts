import express from 'express';
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');

const StartServer = async() => {

    const app = express();
    
    await databaseConnection();
    
    await expressApp(app);

    app.listen(8002, () => {
        console.log(`server is listening to port 8002`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();