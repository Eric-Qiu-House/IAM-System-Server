const Model = require('../models/org-relation-mode');

// 更新角色
async function updateService(info) {
  console
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
    throw error;
  }
}

// 查询关系
async function readService() {
  try {
    const data = await Model.findAll();
    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

// 条件查询 - 返回唯一
async function readByIdsService(info) {
  try {
    const data = await Model.findOne({ where: { id_: info.id_ } })
    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}

// 部门 查 用户
async function readByGroupIdsService(info) {
  try {
    const data = await Model.findAll({
      where: {
        group_id_: info.group_id_
      },
      attributes: ['id_'] // 只查询 id_ 字段
    });
    return data; // 返回空数组而不是 null
  } catch (error) {
    // 处理错误
    throw error; // 抛出错误以便上层处理
  }
}



module.exports = {
  updateService,
  readService,
  readByIdsService,
  readByGroupIdsService,
}

