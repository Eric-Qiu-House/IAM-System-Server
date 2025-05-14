const Model = require('../models/org-group-mod');
//部门表

// Function
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
  
  // 插入部门
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
      console.error('更新出错:', error);
      throw error;
    }
  }
  
// 查找全部
async function readService() {
    try {
      const lists = await Model.findAll({
        where: {
          delete_time_: null
        }
      });
      if (lists.length > 0) {
        const data = buildTree(lists);
        return data;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error finding:', error);
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
    deleteService,
  }