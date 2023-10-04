import express from "express";
import { createServer } from "http";
const cors = require('cors');

import sequelize from "./providers/db"
import router from "./routes"

var _sequelize = sequelize

var app = express()
app.use(express.json())
app.use(cors())
app.use('/', router)


var server = createServer(app)
const port = 2920

server.listen(port, () => console.log(`Server listening on localhost:${port}`))
