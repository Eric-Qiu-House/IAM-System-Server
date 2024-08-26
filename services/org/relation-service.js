const { relationMod } = require('../../models/org');

// 查询关系
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

// 条件查询 - 返回唯一
async function whereId(info) {
  console.log(info, 'infoinfoinfoinfo')
  try {
    const data = await relationMod.findOne({ where: { id_: info.id_ } })
    if (data) {
      console.log(data, 'dataaaaaaaaaaaaa')
      return data;
    } else {
      console.log('not found');
      return null;
    }
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}

// 部门 查 用户
async function findUsersByGroup(info) {
  try {
    const data = await relationMod.findAll({
      where: {
        group_id_: info.group_id_
      },
      attributes: ['id_'] // 只查询 id_ 字段
    });
    return data; // 返回空数组而不是 null
  } catch (error) {
    // 处理错误
    console.error('Error finding users:', error);
    throw error; // 抛出错误以便上层处理
  }
}

// 更新角色
async function updateRelation(info) {
  console
  try {
    const { id_, ...fieldsToUpdate } = info;
    const result = await relationMod.update(
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
  findUsersByGroup,
  whereId,
  updateRelation
}

