const express = require('express');
const axios = require('axios');

const app = express();
const port = 8000;

app.use(express.json());

app.all('/users/*', async (req, res) => {
  const url = `http://localhost:8001${req.url}`;

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


app.all('/products/*', async (req, res) => {
  const url = `http://localhost:8002${req.originalUrl}`;
  
  try {
    const response = await axios({
      method: req.method,
      url: url,
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