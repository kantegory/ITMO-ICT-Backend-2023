import express from "express"
import proxy from "express-http-proxy"

const app = express();

app.use('/auth', proxy('http://localhost:8001'))
app.use('/events', proxy('http://localhost:8003'))

app.listen(8000, () => {
  console.log(`Running server on port 8000`)
})