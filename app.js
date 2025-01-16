const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const uuidUtils = require('./utils/uuid');
const Server = require('./routes');
const cors = require('cors');
const responseInterceptor = require('./middlewares/responseInterceptor');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs'); // 如果需要渲染视图，指定视图引擎

// 应用中间件
app.use(cors());
app.use(logger('dev'));
app.use(express.json()); // 解析 JSON 请求体
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseInterceptor); // 响应拦截中间件
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/iamServer', Server);

// 捕获 404 错误
app.use((req, res, next) => {
  next(createError(404));
});

// 全局错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({ message: err.message, stack: err.stack });
  } else {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// 配置服务端口监听
const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
  console.log(`服务启动,端口号 ${PORT}`);
});
