import * as dotenv from "dotenv";
import express from 'express'
import routes from "./route";


const app = express()

app.use(express.json())
app.use("/", routes )

export const AUTH_SERVICE_URL = process.env.AUTH_SERVICE ? `http://${process.env.AUTH_SERVICE}` : ""
export const COINS_SERVICE_URL = process.env.GAMES_SERVICE ? `http://${process.env.GAMES_SERVICE}` : ""

const server = app.listen(process.env.PORT, () =>
    console.log("Running server on port "),
)