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


app.use('/micro1', proxy('localhost:4001'));
app.use('/micro2',verifyToken, proxy('localhost:4002'));


app.listen(4000, ()=>{
    console.log('Geteway is Listening to port 4000')
})