const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database'); // 引入 Sequelize 实例

class Role extends Model { }

Role.init({ //用于初始化模型的属性和选项。
    id_: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name_: {
        type: DataTypes.STRING,
    },
    sn_: {
        type: DataTypes.INTEGER,
    },
    code_: {
        type: DataTypes.STRING,
    },
    enabled_: {
        type: DataTypes.INTEGER,
    },
    level_: {
        type: DataTypes.INTEGER,
    },
    desc_: {
        type: DataTypes.STRING, 
    },
    type_code_: {
        type: DataTypes.STRING, 
    },
    create_time_: {
        type: DataTypes.DATE, // DATETIME 类型
    },
    create_by_: {
        type: DataTypes.STRING,
    },
    create_org_id_: {
        type: DataTypes.STRING,
    },
    update_time_: {
        type: DataTypes.DATE, // DATETIME 类型
    },
    updater_: {
        type: DataTypes.STRING, 
    },
    update_by_: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,  //指定连接的数据库实例
    modelName: 'Role',  //模型的名称
    tableName: 'org_role' // 指定关联的数据库表名称
});

module.exports = Role;
