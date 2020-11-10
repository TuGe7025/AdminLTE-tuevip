var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var journalRouter = require('./routes/journal');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var emailRouter = require('./routes/email');
var commentRouter = require('./routes/comment');
var homeRouter = require('./routes/home');
var upvideoRouter = require('./routes/upvideo');
var videoinfoRouter = require('./routes/videoinfo');

var app = express();
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","http://localhost:8080");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
})
// view engine setup
app.use(session({
  secret : "1234", //加密session，随便写
  cookie : {maxAge : 60*1000*30}, //设置过期时间 --- 半小时
  resave : true, //强制保存session 默认为 true，建议设置成false
  saveUninitialized : false ////强制将未初始化的session存储 默认为true，建议设置成true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/userinfo', usersRouter);
app.use('/journal', journalRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/email', emailRouter);
app.use('/comment', commentRouter);
app.use('/home', homeRouter);
app.use('/upvideo', upvideoRouter);
app.use('/videoinfo', videoinfoRouter);

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
  res.render('error');
});

module.exports = app;
