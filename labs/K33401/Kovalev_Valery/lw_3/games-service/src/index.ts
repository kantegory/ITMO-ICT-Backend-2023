import express from 'express'
import routes from "./routes";

const app = express()

app.use(express.json())
app.use("/", routes )


const server = app.listen(80, () =>
  console.log(`
🚀 Server ready at: http://localhost:80`),
)
