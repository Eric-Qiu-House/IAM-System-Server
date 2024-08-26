const { groupMod } = require('../../models/org');

// 查找全部
const buildTree = (list, parentId = null) => {
  return list
    .filter(item => item.parent_id_ === parentId)
    .map(item => {
      const children = buildTree(list, item.id_);
      const newItem = {
        ...item.dataValues,
      };
      if (children.length) {
        newItem.children = children;
      }
      return newItem;
    });
};

async function findList() {
    try {
      const lists = await groupMod.findAll({
        where: {
          delete_time_: null
        }
      });
      if (lists.length > 0) {
        const data = buildTree(lists);
        return data;
      } else {
        console.log('No found');
        return [];
      }
    } catch (error) {
      console.error('Error finding:', error);
      throw error;
    }
  }
  
  // 插入部门
  async function addGroup(info) {
    try {
      const data = await groupMod.create(info);
      return data;
    } catch (error) {
      console.error('Error finding users:', error);
      throw error;
    }
  }
  
  // 删除
  async function updateDeleteTime(info) {
    try {
      const result = await groupMod.update(
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
  
  // 更新
  async function updateGroup(info) {
    console.log(info, 'id_');
    try {
      const { id_, ...fieldsToUpdate } = info;
      const result = await groupMod.update(
        fieldsToUpdate,
        { where: { id_: id_ } }
      );
  
      if (result[0] === 0) {
        throw new Error('记录未找到');
      }
  
      console.log('更新成功');
      return result;
    } catch (error) {
      console.error('更新出错:', error);
      throw error;
    }
  }

  module.exports = {
    findList,
    addGroup,
    updateDeleteTime,
    updateGroup
  }