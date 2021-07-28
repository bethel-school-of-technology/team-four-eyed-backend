var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
const mysql = require('mysql');

//var indexRouter = require('./routes/index');
var articlesRouter = require('./routes/articles'); 
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

models.sequelize.sync({alter:true}).then(function () {
  console.log("DB Sync'd up")
});

app.use('/articles', articlesRouter);
//app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
