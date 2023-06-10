const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.all('/goods/*', async (req, res) => {
  const url = `http://localhost:9091${req.originalUrl}`;
  
  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body,
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.listen(port, () => {
  console.log(`Gateway listening at http://localhost:${port}`);
});
