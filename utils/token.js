const jwt = require('jsonwebtoken');

// 签名令牌的秘密密钥(在实际应用中保证其安全和秘密)
const secretKey = 'your_secret_key';

// 构建token的函数
function createToken(payload, expiresIn = '30d') {
  return jwt.sign(payload, secretKey, { expiresIn });
}

// 验证令牌的函数
function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

// 获取token
const acquireToken = (user,res) => {
    if (user) {
        const token = createToken({ id: user.id_, userName: user.fullname_, userId: user.account_, password: user.password_});
        console.log(token,"token")
        res.json({ token });
      } else {
        res.status(401).send('Invalid credentials');
    }
}

// 校验token
const authToken = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Access denied');
    }
  
    try {
      const decoded = verifyToken(token);
      res.json({ message: 'Protected data', user: decoded });
    } catch (error) {
      res.status(401).send(error.message);
    }
}

module.exports = {
  createToken,
  verifyToken,
  authToken,
  acquireToken
};
