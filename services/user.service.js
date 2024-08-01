// 执行sql
const User = require('../models/user.model');

// 创建新用户
async function createUser(fullname_, account_, password_) {
  console.log('4545454545')
  try {
    const user = await User.create({ fullname_, account_, password_});
    console.log('User created:', user.toJSON());
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// 查找所有用户
async function findAllUsers() {
  try {
    const users = await User.findAll();
    if (users.length > 0) {
      return users.map(user => user);
    } else {
      console.log('No users found');
      return [];
    }
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}

// 查询指定用户
async function whereUserId(i) {
  try {
    const user = await User.findOne({ where: { account_: i } })
    if (user) {
      console.log('Found user:', user);
      return user.toJSON();
    } else {
      console.log('User not found');
      return null;
    }
  } catch {
    console.error('Error finding user:', error);
    throw error;
  } 
}

async function findUserById(id) {
  try {
    const user = await User.findByPk(id);
    if (user) {
      console.log('Found user:', user.toJSON());
      return user;
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

async function updateUser(id, newData) {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update(newData);
      console.log('User updated:', user.toJSON());
      return user;
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      console.log('User deleted:', user.toJSON());
      return user;
    } else {
      console.log('User not found');
      return null;
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  whereUserId,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
};