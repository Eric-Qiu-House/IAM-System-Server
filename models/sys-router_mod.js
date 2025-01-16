const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); // 引入 Sequelize 实例

class Router extends Model {}

Router.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  path: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  icon: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  parent_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'routes', // 引用的表名
      key: 'id' // 引用表的列名
    },
    onDelete: 'CASCADE', // 当引用的行被删除时，删除所有关联的行
    onUpdate: 'CASCADE' // 当引用的行被更新时，更新所有关联的行
  },
  hidden: {
    type: DataTypes.BOOLEAN,
  },
  permissions: {
    type: DataTypes.STRING,
  },
  component: {
    type: DataTypes.STRING,
  },
}, {
  sequelize, // 指定连接的数据库实例
  modelName: 'Router', // 模型的名称
  tableName: 'sys_router', // 指定关联的数据库表名称
  // defaultScope: {
  //   where: {
  //     delete_time_: null // 默认查询条件: delete_time_ 为 null
  //   }
  // },
});

module.exports = Router;
