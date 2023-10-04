import express from "express"
import proxy from "express-http-proxy"

const app = express();

app.use('/auth', proxy('http://127.0.0.1:9001'))
app.use('/wallets', proxy('http://127.0.0.1:9002'))

app.listen(9000, () => {
    console.log(`Running server on port 9000`)
})