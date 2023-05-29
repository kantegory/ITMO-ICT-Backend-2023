let express = require('express');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/user');

let app = express();

app.use('/', indexRouter);
app.use('/user', usersRouter);

module.exports = app;