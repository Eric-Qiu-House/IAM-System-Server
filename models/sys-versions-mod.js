const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // 引入 Sequelize 实例

const Model = sequelize.define('versionModel', {
    id_: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    version_number_: {
        type: DataTypes.STRING,
        unique: true,  // 保证 version_number_ 唯一
    },
    version_information_: {
        type: DataTypes.STRING,
    },
    creation_date_: {
        type: DataTypes.DATE, // 创建时间
    },
    delete_date_: {
        type: DataTypes.DATE, // 删除时间
    }
}, {
    sequelize, // 指定连接的数据库实例
    tableName: 'sys_versions', // 指定关联的数据库表名称
    defaultScope: {
        where: {
            delete_date_: null // 默认过滤 delete_date_ 为 NULL 的记录
        }
    },
});

module.exports = Model;
