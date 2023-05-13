import express from 'express'
import routes from "./routes";

const app = express()

app.use(express.json())
app.use("/", routes )

export const AUTH_SERVICE_URL = process.env.AUTH_SERVICE ? `http://${process.env.AUTH_SERVICE}` : ""
export const GAMES_SERVICE_URL = process.env.AUTH_SERVICE ? `http://${process.env.GAMES_SERVICE}` : ""

const server = app.listen(8000, () =>
  console.log(`
🚀 Server ready at: http://localhost:8000`),
)
