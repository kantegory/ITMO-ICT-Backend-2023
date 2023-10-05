import express from 'express'
import cors from 'cors'

const app = express();
const port = 5555
const host = 'localhost'

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.all(`/api/v2/users/*`, async (request: any, response: any) => {
    try {
        await fetch(`http://localhost:5556/api/v2/`)
        console.log(`http://localhost:5556${request.originalUrl}`)
        response.redirect(307, `http://localhost:5556${request.originalUrl}`)
    } catch (e) {
        response.status(500).send('Internal Server Error');
    }
})

app.all(`/api/v2/posts/*`, async (request: any, response: any) => {
    try {
        await fetch(`http://localhost:5557/api/v2/healthcheck`)
        console.log(`http://localhost:5557${request.originalUrl}`)
        response.redirect(307, `http://localhost:5557${request.originalUrl}`)
    } catch (e) {
        response.status(500).send('Internal Server Error');
    }
})


app.listen(port, () => {
    console.log(`Running gateway on  http://${host}:${port}`)
})

