var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var index = require('./routes/index');
var findUser = require('./routes/user-schema/findUser');
var loginUser = require('./routes/user-schema/loginUser');
var postUser = require('./routes/user-schema/postUser');
var signout = require('./routes/user-schema/signout');
var forgotPassword = require('./routes/user-schema/forgotPassword');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//for connecting mongodb database mlab uri is used
var configDB = require('./config.js');

// configuration =========================================
mongoose.connect(configDB.url); // connect to the database

app.use('/', index);
app.use('/user/details',findUser);
app.use('/user/signup',postUser);
app.use('/user/login',loginUser);
app.use('/user/signout',signout);
app.use('/user/forgotPassword',forgotPassword);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
