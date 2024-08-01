// 集中捕获错误
// catchAsync 通过捕获异步函数中的错误并传递给下一个错误处理中间件（使用 next(err)），确保所有错误都能被统一处理。
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

module.exports = catchAsync;
