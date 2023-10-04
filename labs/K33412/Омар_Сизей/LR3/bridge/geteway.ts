import express from 'express';
import verifyToken from './middleware/tokenVerification';

const cors = require('cors');

const proxy = require('express-http-proxy');


const app = express();
app.use(express.json());

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }})


app.use('/login', proxy('localhost:9001'));
app.use('/other',verifyToken, proxy('localhost:9002'));


app.listen(9000, ()=>{
    console.log('Geteway is Listening to port 9000')
})
