const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const uuidUtils = require('./utils/uuid');

// 路由模块
const systemRouter = require('./routes/system/index');
const loginRouter = require('./routes/login/login');
const orgRouter = require('./routes/org');

// 将 uuidv1 添加到 global 对象
global.uuid1 = uuidUtils.uuid1;

const cors = require('cors');

const responseInterceptor = require('./middlewares/responseInterceptor');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 应用中间件
app.use(cors());
app.use(logger('dev'));
app.use(express.json()); // 解析 JSON 请求体
app.use(responseInterceptor); // 响应拦截中间件
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/org',orgRouter);
app.use('/login',loginRouter);
app.use('/system', systemRouter);

// 捕获 404 错误
app.use((req, res, next) => {
  next(createError(404));
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 错误处理器
// app.use((err, req, res, next) => {
//   // 设置局部变量，只在开发过程中提供错误
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // 输出错误
//   res.status(err.status || 500);
//   res.render('error');
// });

// 配置服务端口监听
app.listen(3002, function () {
  console.log("服务启动,端口号3002");
})

// 生产环境启动
// module.exports = app;
