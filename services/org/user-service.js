const { userMod } = require('../../models/org');
const { Op } = require('sequelize'); // 确保导入了 Op

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

// [id...] 
async function fetchUsersByUserIds(userIds) {
  console.log(userIds, 'userids');

  // 确保 userIds 是一个数组且不为空
  if (!Array.isArray(userIds) || userIds.length === 0) {
    throw new Error('Invalid user IDs');
  }

  try {
    // 查询数据库中的数据
    const lists = await userMod.findAll({
      where: {
        id_: {
          [Op.in]: userIds
        }
      }
    });
    console.log(lists, 'listslistslists');

    // 提取纯数据
    return lists.map(record => record.get({ plain: true }));
  } catch (error) {
    // 捕获并处理错误
    console.error('Error fetching users:', error);
    throw new Error('查询出错');
  }
}

module.exports = {
  findList,
  whereUserId,
  whereUser,
  fetchUsersByUserIds
}