const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database'); // 引入 Sequelize 实例

class User extends Model {}

User.init({ //用于初始化模型的属性和选项。
  id_: {
    type: DataTypes.STRING,
    autoIncrement: false,
    primaryKey: true,
  },
  fullname_: {
    type: DataTypes.STRING, //字符串类型
    allowNull: false, //不允许为空
    unique: false //必须唯一
  },
  account_: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true 
  },
  password_: {
    type: DataTypes.STRING,
    required: false,
    trim: false
    // validate(value) {
    //   if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    //     throw new Error('Password must contain at least one letter and one number');
    //   }
    // },
  },
  email_: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  mobile_: {
    type: DataTypes.STRING
  },
  weixin_: {
    type: DataTypes.STRING
  },
  address_: {
    type: DataTypes.STRING
  },
  photo_: {
    type: DataTypes.STRING
  },
  sex_: {
    type: DataTypes.STRING
  },
  signature_: {
    type: DataTypes.STRING
  },
  from_: {
    type: DataTypes.STRING
  },
  status_: {
    type: DataTypes.INTEGER
  },
  openid_: {
    type: DataTypes.STRING
  },
  expire_date_: {
    type: DataTypes.DATE
  },
  create_time_: {
    type: DataTypes.DATE
  },
  create_by_: {
    type: DataTypes.STRING
  },
  create_org_id_: {
    type: DataTypes.STRING
  },
  update_time_: {
    type: DataTypes.DATE
  },
  updater_: {
    type: DataTypes.STRING
  },
  update_by_: {
    type: DataTypes.STRING
  }
}, {
  sequelize,  //指定连接的数据库实例
  modelName: 'User',  //模型的名称
  tableName: 'org_user' // 指定关联的数据库表名称
});

module.exports = User;
