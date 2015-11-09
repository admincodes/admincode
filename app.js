// Express에 관한 내용들 init
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

// http://codeforgeek.com/2015/01/nodejs-mysql-tutorial/
var dbcon = require('./routes/test/dbcon');

var dbcon = require('./node_mymodules/sql/dbinit');

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
  // 추후 trace를 하게 위해서 err.stack 을 사용하여 logging하시기 바랍니다.
  // Published story에서 beautifule logging winston 참조
});

// routers 들 셋팅
var routes = require('./routes/index');
var users = require('./routes/users/users');
var test = require('./routes/test/test');
var file = require('./routes/test/file');

// board
var boards = require('./routes/boards/boards');

// properties 파일들 불러오기
var properties = require('./properties/properties');

// 익스프레스 라이브러리 실행
var app = express();

// view engine setup
// 자데 엔진을 사용하기 위해서
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// dev, common, combined
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'ssshhhhh'}));

// 파일 서버용... 경로를 잡아준다.
app.use(express.static(path.join(properties.fileServerPath)));


/**
 * 파라미터찍기 위해서
 */
app.use(function (req, res, next) {
  console.log(req.body); // '/new'
  console.log(req.query); // '/new'
  console.log(req.path); // '/new'
  next();
});

// session check
app.use(function (req, res, next) {
  if(req.path.indexOf("session") > -1){
    if(typeof req.session.user_email != 'undefined'
        && req.session.user_email != null
        && req.session.user_email != '' ){
      next();
    }else{
      res.json({"code" : 99}); // 세션이 없는데 세션이 필요한 걸 호출
    }
  }else{
    next();
  }




});

app.use('/', routes);
app.use('/users', users);
app.use('/test', test);
app.use('/files', file);
app.use('/boards', boards);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
