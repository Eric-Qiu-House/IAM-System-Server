const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database'); // 引入 Sequelize 实例

class Relation extends Model { }

Relation.init({ //用于初始化模型的属性和选项。
    id_: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    group_id_: {
        type: DataTypes.STRING,
    },
    user_id_: {
        type: DataTypes.STRING,
    },
    is_master_: {
        type: DataTypes.INTEGER,
    },
    role_id_: {
        type: DataTypes.STRING,
    },
    status_: {
        type: DataTypes.INTEGER, 
    },
    type_: {
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
    modelName: 'relation',  //模型的名称
    tableName: 'org_relation' // 指定关联的数据库表名称
});

module.exports = Relation;
