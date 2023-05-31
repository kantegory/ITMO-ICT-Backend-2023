const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const auth = require('./auth')

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/users/register|login', async (req, res) => {
  const url = `http://localhost:2920${req.originalUrl}`;

  const req_options = {
    method: req.method,
    body: JSON.stringify(req.body),
    headers: req.headers
  }

  try{
    const response = await fetch(url, req_options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      console.log(error)
      res.status(500).send('Internal Server Error!');
    }
  }
});

app.all('/users/me|reset', auth, async (req, res) => {
  const url = `http://localhost:2920${req.originalUrl}`;

  const headers = {
    ...req.headers,
    user: '' + req.user.id
  }

  let req_options = {
    method: req.method,
    headers
  }
  try {
    if (req.method != 'GET') {
      req_options = {
        ...req_options,
        body: JSON.stringify(req.body)
      }
    }

    const response = await fetch(url, req_options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      console.log(error)
      res.status(500).send('Internal Server Error!');
    }
  }
});

app.all('/events/*', async (req, res) => {
  const url = `http://localhost:9523${req.originalUrl}`;
  let req_options = {
    method: req.method,
    headers: req.headers
  }
  try {
    if (req.method != 'GET') {
      req_options = {
        ...req_options,
        body: JSON.stringify(req.body)
      }
    }

    const response = await fetch(url, req_options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send('Internal Server Error');
    }
  }
});

app.all('/entries/*', auth, async (req, res) => {
  const url = `http://localhost:9523${req.originalUrl}`;
  const headers = {
    ...req.headers,
    user: '' + req.user.id
  }

  let req_options = {
    method: req.method,
    headers
  }
  try {
    if (req.method != 'GET') {
      req_options = {
        ...req_options,
        body: JSON.stringify(req.body)
      }
    }

    const response = await fetch(url, req_options);
    const data = await response.json();
    res.status(response.status).json(data);

  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send(error.response.data);
    } else {
      res.status(500).send('Internal Server Error!');
    }
  }
});

app.listen(port, () => {
  console.log(`Gateway listening at http://localhost:${port}`);
});