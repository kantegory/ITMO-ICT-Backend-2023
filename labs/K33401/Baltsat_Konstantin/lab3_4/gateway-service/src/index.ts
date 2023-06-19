import * as dotenv from "dotenv";
import express from 'express'
import router from "./route";


const app = express()

app.use(express.json())
app.use("/", router)

export const AUTH_SERVICE_URL = process.env.AUTH_SERVICE ? `http://${process.env.AUTH_SERVICE}` : ""
export const COINS_SERVICE_URL = process.env.COINS_SERVICE ? `http://${process.env.COINS_SERVICE}` : ""

const server = app.listen(8000, () =>
    console.log("Running server on port 8000"),
)