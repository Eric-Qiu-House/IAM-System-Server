const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,    // 数据库名
    process.env.DB_USER,    // 用户名
    process.env.DB_PASSWORD, // 密码
    {
        host: process.env.DB_HOST, // 数据库主机
        port: process.env.DB_PORT, // 数据库端口
        dialect: 'mysql',
        pool: {
            max: parseInt(process.env.DB_POOL_MAX) || 20, // 连接池最大连接数
            min: parseInt(process.env.DB_POOL_MIN) || 0,  // 连接池最小连接数
            acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000, // 获取连接的最大时间
            idle: parseInt(process.env.DB_POOL_IDLE) || 10000 // 连接闲置的最大时间
        },
        logging: process.env.DB_LOGGING === 'true' ? console.log : false, // 是否启用日志
        define: {
            timestamps: process.env.DB_TIMESTAMPS === 'true' // 自动添加 createdAt 和 updatedAt
        }
    }
);

module.exports = sequelize;
