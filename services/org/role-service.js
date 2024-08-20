const { roleMod } = require('../../models/org');

// 查找全部 delete_time_ 为空的记录
async function findList() {
  try {
    const lists = await roleMod.findAll({
      where: {
        delete_time_: null
      }
    });

    if (lists.length > 0) {
      return lists;
    } else {
      console.log('No records found');
      return [];
    }
  } catch (error) {
    console.error('Error finding records:', error);
    throw error;
  }
}

// 插入新角色
async function addRole(roleInfo) {
  console.log(roleInfo, 'roleInfo')
  try {
    const newRole = await roleMod.create(roleInfo);
    return newRole;
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}

// 删除
async function updateDeleteTime(info) {
  console.log(info, 'id_');
  try {
    const result = await roleMod.update(
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

// 更新角色
async function updateRole(info) {
  console.log(info, 'id_');
  try {
    const { id_, ...fieldsToUpdate } = info;
    const result = await roleMod.update(
      fieldsToUpdate,
      { where: { id_: id_ } }
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
  findList,
  addRole,
  updateDeleteTime,
  updateRole
}