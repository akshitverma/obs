var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var pdf = require('express-pdf');

//Setting Models here...
var db = require('./models/db');
var user = require('./models/user');
var teacher = require('./models/teachers');

//Setting Routes here....
var index = require('./routes/index');
var login = require('./routes/login');
var addTeacher = require('./routes/teachers.js');
var addCourses = require('./routes/courses.js');
var addStudents = require('./routes/students.js');
var addQuestions = require('./routes/questions.js')
var generateQuestions = require('./routes/generate_questions')
var entermarks = require('./routes/marks.js');
var savemarks = require('./routes/analysemarks.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(pdf);

//Setting routes naming...
app.use('/', index);
app.use('/login', login);
app.use('/addTeacher', addTeacher);
app.use('/addCourses', addCourses);
app.use('/addStudents', addStudents);
app.use('/addQuestion', addQuestions);
app.use('/generateQuestionPaper', generateQuestions);
app.use('/entermarks', entermarks);
app.use('/savemarks', savemarks);

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
