const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const logger = require('morgan');

const indexRouter = require('./routes/index');
// const usersRouter = require('./Routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json()); // express.json()
app.use(express.urlencoded({extended: true}));
app.use(cookieParser('ecwhale'));//express-session插件需要到cookie-parser
// session 中间件
app.use(session({
    name: 'ecwhale', // 设置 cookie 中保存 session id 的字段名称
    secret: 'ecwhale', // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: false, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new fileStore()
}));
app.use(function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', 'http://1200.ecwhale.com'); //先允许跨域请求才能进来
    // res.header("Access-Control-Allow-Credentials", "true");//处理cookie信息，如果有，并且不对每次请求都新开一个session
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    // res.header('Access-Control-Allow-Headers', 'x-requested-with,content-type');
    res.header('Content-Type', 'text/html;charset=utf-8');
    next();
});
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
indexRouter(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
