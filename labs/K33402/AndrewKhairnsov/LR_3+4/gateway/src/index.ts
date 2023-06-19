import express from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware';

const app = express();

app.use('/users', createProxyMiddleware({target: 'http://auth:8080', changeOrigin: true}))
app.use('/currency', createProxyMiddleware({target: 'http://currency:8080', changeOrigin: true}))

app.listen(8080, () => {
    console.log('Gateway is running on port 8080. Ara-ara~')
})