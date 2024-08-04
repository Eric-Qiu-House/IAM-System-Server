const { relationMod } = require('../../models/org');

// 查找全部
async function findList() {
  try {
    const data = await relationMod.findAll();
    if (data.length > 0) {
      return data;
    } else {
      console.log('No users found');
      return [];
    }
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}

// 部门 查 用户
async function findUsersByGroup(i) {
  try {
    const data = await relationMod.findAll({
      where: {
        group_id_: i.group_id_
      },
      attributes: ['user_id_'] // 只查询 user_id_ 字段
    });
    if (data.length > 0) {
      return data;
    } else {
      console.log('No users found');
      return [];
    }
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}



module.exports = {
  findList,
  findUsersByGroup
}

