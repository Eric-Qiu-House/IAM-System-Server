// 响应拦截

function responseInterceptor(req, res, next) {
    const originalJson = res.json.bind(res);

    res.json = (data) => {
      // 在这里进行响应数据的修改或日志记录
      console.log('Response data:', data);
  
      // 调用原始的 res.json 方法
      return originalJson(data);
    };
  
    next();
}

module.exports = responseInterceptor;
