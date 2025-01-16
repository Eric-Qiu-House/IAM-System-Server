const Model = require('../models/org-user-mod');
const { Op } = require('sequelize'); // 确保导入了 Op

// 插入
async function createService(info) {
  try {
    const data = await Model.create(info);
    return data;
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}
// 更新
async function updateService(info) {
  console.log(info, 'id_');
  try {
    const { id_, ...fieldsToUpdate } = info;
    const result = await Model.update(
      fieldsToUpdate,
      { where: { id_: id_ } }
    );

    if (result[0] === 0) {
      throw new Error('记录未找到');
    }

    console.log('更新成功');
    return result;
  } catch (error) {
    console.error('更新时出错:', error);
    throw error;
  }
}

// 查找全部
async function readService() {
  try {
    const lists = await Model.findAll();
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


// 条件查询 - 根据数组返回全部记录
async function readByIdsService(ids) {
  try {
    // 使用 Sequelize 的 `findAll` 方法，查询匹配的所有记录
    const users = await Model.findAll({
      where: {
        id_: ids, // Sequelize 会自动将数组解析为 IN 查询
      },
    });

    if (users.length > 0) {
      console.log('Found users:', users);
      return users;
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
async function readByIdToUserService(i) {
  console.log(i,'iiii')
  try {
    const user = await Model.findOne({ where: { id_: i.id_ } })
    if (user) {
      return user;
    } else {
      console.log('User not found');
      return null;
    }
  } catch(error) {
    console.error('Error finding user:', error);
    throw error;
  }
}

// 条件查询 - 返回全部
async function whereUser(i) {
  try {
    const user = await Model.findAll({
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
async function readByUserIdsService(userIds) {
  console.log(userIds, 'userids');

  // 确保 userIds 是一个数组且不为空
  if (!Array.isArray(userIds) || userIds.length === 0) {
    throw new Error('Invalid user IDs');
  }

  try {
    // 查询数据库中的数据
    const lists = await Model.findAll({
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

// 删除
async function deleteService(info) {
  try {
    const result = await Model.update(
      { delete_time_: new Date() },
      { where: { id_: info.id_ } }
    );

    if (result[0] === 0) {
      throw new Error('记录未找到');
    }

    console.log('删除时间更新成功');
    return result;
  } catch (error) {
    console.error('更新删除时间时出错:', error);
    throw error;
  }
}



module.exports = {
  createService,
  updateService,
  readService,
  readByIdsService,
  readByUserIdsService,
  deleteService,
  // whereUser,
}