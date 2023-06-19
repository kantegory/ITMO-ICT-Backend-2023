import express from "express";
import { createServer } from "http";

import sequelize from "./providers/db"
import userRouter from "./routes/User"

var _sequelize = sequelize

var app = express()
app.use(express.json())
app.use('/', userRouter)


var server = createServer(app)
const port = 9523

server.listen(port, () => console.log(`Server listening on localhost:${port}`))
