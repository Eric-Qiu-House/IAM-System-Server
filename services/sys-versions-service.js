const Model = require('../models/sys-versions-mod');
// 版本信息表

// 插入
async function createService(info) {
  try {
    console.log(info,'sssssssssssss')
    const data = await Model.create(info);
    return data;
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}

// 更新
async function updateService(info) {
  const { id_, ...fieldsToUpdate } = info;

  if (!id_) {
    throw new Error('缺少必要的标识字段: id_');
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    throw new Error('更新的字段为空');
  }

  try {
    const result = await Model.update(fieldsToUpdate, { where: { id_: 10 } });
    if (result[0] === 0) {
      throw new Error('记录未找到或未更新任何字段');
    }
    return result;
  } catch (error) {
    console.error('更新出错:', error.message);
    throw error;
  }
}


async function readService() {
  try {
    const lists = await Model.findAll({
      order: [['creation_date_', 'DESC']], // 按创建日期降序排列
    });
      return lists;
  } catch (error) {
    console.error('Error finding:', error);
    throw error;
  }
}

async function readLatestService() {
  try {
      const data = await Model.findOne({
          order: [['creation_date_', 'DESC']], // 按创建日期降序排列
      });
      return data;
  } catch (error) {
      console.error('Error fetching latest version:', error);
      throw error;
  }
};

// 调用示例
// getLatestVersion().then(version => {
//   console.log('Latest version:', version);
// });


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
  readLatestService,
  deleteService,
}