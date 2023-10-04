import express from "express"
import proxy from "express-http-proxy"

const app = express();

app.use('/auth', proxy('http://localhost:8001'))
app.use('/', proxy('http://localhost:8002'))

app.listen(8000, () => {
    console.log(`Running server on port 8000`)
})





