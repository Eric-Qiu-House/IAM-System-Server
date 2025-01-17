const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

class User extends Model { }

User.init({
  id_: {
    type: DataTypes.UUID, // 使用 UUID 数据类型
    defaultValue: DataTypes.UUIDV4, // 使用 Sequelize 内建的 UUIDV4 生成默认值
    autoIncrement: false,
    primaryKey: true,
  },
  avatar_: {
    type: DataTypes.BLOB('long'), 
    allowNull: true 
  },
  fullname_: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'Full name cannot be null'
      }
    }
  },
  account_: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
    validate: {
      notEmpty: true,
      notNull: {
        msg: 'Account cannot be null'
      }
    }
  },
  password_: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isStrongEnough(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      // 移除 isAlphanumeric 验证，允许特殊字符
    }
  },
  email_: {
    type: DataTypes.STRING,
  },
  mobile_: {
    type: DataTypes.STRING,
  },
  weixin_: {
    type: DataTypes.STRING,
  },
  user_type_: {
    type: DataTypes.STRING,
  },
  status_: {
    type: DataTypes.INTEGER,
  },
  create_time_: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // 自动设置创建时间
  },
  create_by_: {
    type: DataTypes.STRING,
  },
  update_time_: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // 自动设置更新时间
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
  defaultScope: {
    attributes: { exclude: ['password_'] },
    where: {
      delete_time_: null // 默认查询条件: delete_time_ 为 null
    }
  },
  hooks: {
    beforeCreate: async (user) => {
      if (user.password_) {
        const salt = await bcrypt.genSalt(10);
        user.password_ = await bcrypt.hash(user.password_, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password_')) {
        const salt = await bcrypt.genSalt(10);
        user.password_ = await bcrypt.hash(user.password_, salt);
      }
    }
  },
  sequelize,  // 指定连接的数据库实例
  modelName: 'User',  // 模型的名称
  tableName: 'org_user', // 指定关联的数据库表名称
  defaultScope: {
    where: {
      delete_time_: null // 默认查询条件: delete_time_ 为 null
    }
  },
});

module.exports = User;
