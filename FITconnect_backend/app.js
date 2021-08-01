var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
const mysql = require('mysql');
var bcrypt = require('bcrypt');
var auth = require('./services/auth');
var cors = require('cors');

var articlesRouter = require('./routes/articles');
var trainersRouter = require('./routes/trainers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

models.sequelize.sync().then(function () {
  console.log("DB Sync'd up")
});

app.use(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return next();
  }

  const token = header.split(' ')[1]

  // validate token / get the user
  const trainers = await auth.verifyUser(token);
  req.trainers = trainers;
  next();

});

app.use('/articles', articlesRouter);
app.use('/trainers', trainersRouter);


module.exports = app;
