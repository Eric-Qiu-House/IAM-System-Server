const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database'); // 引入 Sequelize 实例
const { v4: uuidv4 } = require('uuid'); // 引入 uuid 库

class Group extends Model { }

Group.init({ //用于初始化模型的属性和选项。
    id_: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name_: {
        type: DataTypes.STRING,
        allowNull: false
      },
      parent_id_: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      sn_: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state_: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type_: {
        type: DataTypes.STRING,
        allowNull: false
      },
      desc_: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      delete_time_: {
        type: DataTypes.DATE,
        allowNull: true
      }
}, {
    sequelize,  //指定连接的数据库实例
    modelName: 'role',  //模型的名称
    tableName: 'org_group' // 指定关联的数据库表名称
});

module.exports = Group;
