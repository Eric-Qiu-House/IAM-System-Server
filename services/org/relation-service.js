const { relationMod } = require('../../models/org');

// 查找全部
async function findList() {
    try {
      const lists = await relationMod.findAll();
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

  module.exports = {
    findList
  }