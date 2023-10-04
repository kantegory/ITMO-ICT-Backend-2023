import express from 'express'
import cors from 'cors'
import axios from "axios"

const app = express();
const port = 5555
const host = 'localhost'

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.all(`/api/v2/users/*`, async (request: any, response: any) => {
    try {
        await fetch(`http://users:5556/api/v2/`)
        console.log(`http://users:5556${request.originalUrl}`)
        const inresponse = await axios({
            method: request.method,
            url: `http://users:5556${request.originalUrl}`,
            data: request.body,
            headers: {
                authorization: request.headers.authorization
            }
        });
        response.status(inresponse.status).send(inresponse.data)
    } catch (e: any) {
        if (e.response) {
            response.status(e.response.status).send(e.response.data);
        } else {
            response.status(500).send('Internal Server Error');
        }
    }
})

app.all(`/api/v2/posts/*`, async (request: any, response: any) => {
    try {
        await fetch(`http://posts:5557/api/v2/healthcheck`)
        console.log(`http://posts:5557${request.originalUrl}`)
        const inresponse = await axios({
            method: request.method,
            url: `http://posts:5557${request.originalUrl}`,
            data: request.body,
            headers: {
                authorization: request.headers.authorization
            }
        });
        response.status(inresponse.status).send(inresponse.data)
    } catch (e: any) {
        if (e.response) {
            response.status(e.response.status).send(e.response.data);
        } else {
            response.status(500).send('Internal Server Error');
        }
    }
})


app.listen(port, () => {
    console.log(`Running gateway on  http://${host}:${port}`)
})

