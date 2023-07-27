const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql2 = require('mysql2');
const indexRouter = require('./routes/index');
const routes = require('express-list-endpoints');

// Other code...


let db = require('./db');

// connect to the database


let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// log all available routes
console.log(routes(app));


module.exports = app;
