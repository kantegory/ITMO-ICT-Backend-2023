const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

app.use(express.json());

app.use('/users', usersRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});