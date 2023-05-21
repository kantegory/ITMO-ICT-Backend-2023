import express from 'express';
const cors = require('cors');
const proxy = require('express-http-proxy');


const app = express();


app.use(cors());
app.use(express.json());

app.use('/auth', proxy('localhost:9001'));
app.use('/main', proxy('localhost:9002'));


app.listen(9000, ()=>{
    console.log('Geteway is Listening to port 9000')
})
