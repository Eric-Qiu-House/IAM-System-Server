require('./config/loadEnv'); // 确保环境变量在所有模块之前加载
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const responseInterceptor = require('./middlewares/responseInterceptor');
const Server = require('./routes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(responseInterceptor);
app.use('/iamServer', Server);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({ message: err.message, stack: err.stack });
  } else {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

console.log('Current Environment:', process.env.NODE_ENV);
console.log('Database Host:', process.env.DB_HOST);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`服务启动,端口号 ${PORT}`);
});
