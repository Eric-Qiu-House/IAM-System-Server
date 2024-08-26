const { roleMod } = require('../../models/org');
const { Op } = require('sequelize');

// 查找全部 delete_time_ 为空的记录
async function findList() {
  try {
    const lists = await roleMod.findAll();
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

// 查找通过角色id数组查询router_tree_的方法
async function findRouterTreeByRoleIds(roleIds) {
  try {
    const routerTrees = await roleMod.findAll({
      where: {
        id_: {
          [Op.in]: roleIds, // 使用Op.in来匹配roleIds数组中的任何一个角色ID
        }
      },
    });

    if (routerTrees.length > 0) {
      return routerTrees;
    } else {
      console.log('No records found for the given role IDs');
      return [];
    }
  } catch (error) {
    console.error('Error finding router trees by role IDs:', error);
    throw error;
  }
}

// 插入新角色
async function addRole(info) {
  try {
    const data = await roleMod.create(info);
    return data;
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

    console.log('更新成功');
    return result;
  } catch (error) {
    console.error('更新时出错:', error);
    throw error;
  }
}

module.exports = {
  findList,
  addRole,
  updateDeleteTime,
  updateRole,
  findRouterTreeByRoleIds
}