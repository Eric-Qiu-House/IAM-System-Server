const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('upro_system_mysql', 'Eric', 'qzy8836610.', {
    host: '192.168.13.161',
    port: 3306,
    dialect: 'mysql',
    pool: {
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: console.log,
        define: {
            timestamps: false // 关闭自动添加的 createdAt 和 updatedAt 字段
        }
    });

module.exports = sequelize;
