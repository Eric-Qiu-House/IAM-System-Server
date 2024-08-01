const { userMod } = require('../../models/org');

// 查找全部
async function findList() {
  try {
    const lists = await userMod.findAll();
    if (lists.length > 0) {
      return lists;
    } else {
      console.log('No users found');
      return [];
    }
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}

// 条件查询 - 返回唯一
async function whereUserId(i) {
  try {
    const user = await userMod.findOne({ where: { account_: i } })
    if (user) {
      console.log('Found user:', user);
      return user;
    } else {
      console.log('User not found');
      return null;
    }
  } catch {
    console.error('Error finding user:', error);
    throw error;
  }
}

// 条件查询 - 返回全部
async function whereUser(i) {
  try {
    const user = await userMod.findAll({
      where: {
        fullname_: i.fullname_, 
        account_: i.account_,
        email_: i.email_, 
        mobile_:imobile_ 
      }
    })
    if (user) {
      return user;
    } else {
      console.log('User not found');
      return null;
    }
  } catch(error)  {
    console.error('Error finding user:', error);
    throw error;
  }
}

module.exports = {
  findList,
  whereUserId,
  whereUser
}