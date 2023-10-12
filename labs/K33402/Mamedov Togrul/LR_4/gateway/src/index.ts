const express = require('express');
const axios = require('axios');

const app = express();
const port = 8000;

app.use(express.json());


app
    .all('/events/*', async (req: any, res: any) => {
        const url = `http://events_microservice:9000${req.originalUrl}`;

        try {
            const response = await axios({
                method: req.method,
                url: url,
                data: req.body,
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

app
    .all('/users/*', async (req: any, res: any) => {
        const url = `http://users_microservice:9091${req.url}`;

       try {
            const response = await axios({
                method: req.method,
                url: url,
                data: req.body,
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

app.listen(port, () => {
    console.log(`Running gateway on port ${port}`);
});
