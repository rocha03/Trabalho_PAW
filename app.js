var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { checkUser } = require('./public/scripts/auth');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var dashboardRouter = require('./routes/dashboard');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/user');

//conect to db
const uri = "mongodb+srv://whomever:Un1RhYblz3nM68Gr@cluster0.wlcpots.mongodb.net/CulturaTix";
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

app.get('*', checkUser);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/dashboard', dashboardRouter);
app.use('/user', usersRouter);

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
  res.render('404', { title: '404' });
});

module.exports = app;
