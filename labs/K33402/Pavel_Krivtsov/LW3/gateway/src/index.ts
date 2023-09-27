import express from 'express'
import cors from 'cors'
import {createServer, Server} from 'http'
import axios from "axios";

const app = express();
const port = 8000
const host = 'localhost'

const microservices = {
    users: 8001,
    kinopoisk: 8002
}

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

for (const m in microservices) {
    app.all(`/${m}/*`, async (req: any, res: any) => {
        const url = `http://${host}:${microservices[m]}${req.originalUrl}`;
        try {
            const response = await axios({
                method: req.method,
                url: url,
                data: req.body,
                headers: {
                    auth: req.headers.auth
                }
            });
            res.status(response.status).send(response.data);
        } catch (e) {
            if (e.response) {
                res.status(e.response.status).send(e.response.data);
            } else {
                res.status(500).send('Internal Server Error');
            }
        }
    });
}

app.listen(port, () => {
    console.log(`Running gateway on  http://${host}:${port}`)
})

