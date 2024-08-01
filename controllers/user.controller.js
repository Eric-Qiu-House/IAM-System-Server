// const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
// const catchAsync = require('../utils/catchAsync');
// const { userService } = require('../services');
const userService = require('../services/user.service');

// 创建新用户
async function createUserController(req, res) {
  try {
    const { fullname_, account_, password_, } = req.query;
    const user = await userService.createUser(fullname_, account_, password_);
    res.status(201).json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//获取全部用户
async function findUserByIdController(req, res) {
  try {
    const user = await userService.findAllUsers();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// 其他控制器函数

module.exports = {
  createUserController,
  findUserByIdController,
  // 导出其他控制器函数
};