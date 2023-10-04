import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', proxy('http://localhost:8001'))
app.use('/event', proxy('http://localhost:8002'))
app.use('/attendance', proxy('http://localhost:8003'))


app.listen(8000, () => {
    console.log('server is listening on port 8000')
})