const Model = require('../models/org-role-mod');
const { Op } = require('sequelize');

// 插入新角色
async function createService(info) {
  try {
    const data = await Model.create(info);
    return data;
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}

// 更新角色
async function updateService(info) {
  try {
    const { id_, ...fieldsToUpdate } = info;
    const result = await Model.update(
      fieldsToUpdate,
      { where: { id_: id_ } }
    );

    if (result[0] === 0) {
      throw new Error('记录未找到');
    }

    return result;
  } catch (error) {
    console.error('更新时出错:', error);
    throw error;
  }
}

// 查找全部 delete_time_ 为空的记录
async function readService() {
  try {
    const lists = await Model.findAll();
    if (lists.length > 0) {
      return lists;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error finding records:', error);
    throw error;
  }
}
// 查找通过角色id数组查询router_tree_的方法
async function readByIdsService(roleIds) {
  try {
    const routerTrees = await Model.findAll({
      where: {
        id_: {
          [Op.in]: roleIds, // 使用Op.in来匹配roleIds数组中的任何一个角色ID
        }
      },
    });

    if (routerTrees.length > 0) {
      return routerTrees;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error finding router trees by role IDs:', error);
    throw error;
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
  deleteService,
}