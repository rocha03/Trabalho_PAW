var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/auth/register');
var loginRouter = require('./routes/auth/login');
var dashboardRouter = require('./routes/dashboard');
var usersRouter = require('./routes/users');

//conect to db
const uri = "mongodb+srv://whomever:Un1RhYblz3nM68Gr@cluster0.wlcpots.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri)
  .then((result) => console.log('conected to db'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});

module.exports = app;
