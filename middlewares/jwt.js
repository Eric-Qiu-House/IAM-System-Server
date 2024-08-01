// jwt.js
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // 这里替换为你的密钥
const expiresIn = '30d'; // 设置 token 有效期为30天

function createToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid token');
  }
}

module.exports = { createToken, verifyToken };
