const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database'); // 引入 Sequelize 实例
class Role extends Model { }

Role.init({ //用于初始化模型的属性和选项。
    id_: {
        type: DataTypes.INTEGER,
        autoIncrement: true,  // 设置为自增 ID
        primaryKey: true      // 设置为主键
    },
    name_: {
        type: DataTypes.STRING,
    },
    enabled_: {
        type: DataTypes.INTEGER,
    },
    router_tree_: {
        type: DataTypes.JSON,
        // set(value) {
        //     // 保存到数据库时，将数组转换为 JSON 字符串
        //     if (Array.isArray(value)) {
        //         this.setDataValue('router_tree_', JSON.stringify(value));
        //     } else {
        //         this.setDataValue('router_tree_', value);
        //     }
        // },
        get() {
            const rawValue = this.getDataValue('router_tree_');
            try {
                // 从数据库读取时，将 JSON 字符串解析为数组
                return JSON.parse(rawValue);
            } catch (error) {
                return rawValue;
            }
        }
    },
    sn_: {
        type: DataTypes.INTEGER,
    },
    desc_: {
        type: DataTypes.STRING,
    },
    create_time_: {
        type: DataTypes.DATE, // DATETIME 类型
    },
    create_by_: {
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
    delete_time_: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize,  //指定连接的数据库实例
    modelName: 'Role',  //模型的名称
    tableName: 'org_role', // 指定关联的数据库表名称
    defaultScope: {
        where: {
          delete_time_: null // 默认查询条件: delete_time_ 为 null
        }
      },
});

module.exports = Role;
