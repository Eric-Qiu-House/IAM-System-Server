const fs = require('fs');
const path = require('path');

// 确保日志目录存在
const logsDir = path.resolve(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

module.exports = {
  apps: [
    {
      name: 'IAM-SERVER', // 应用名称
      script: './app.js', // 启动脚本
      instances: '1', // 使用 CPU 核心数（最大化性能）
      exec_mode: 'cluster', // 开启集群模式
      watch: false, // 关闭文件监听，生产环境中不建议开启
      env: {
        NODE_ENV: 'production', // 设置环境变量
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z', // 日志时间格式
      error_file: './logs/error.log', // 错误日志路径
      out_file: './logs/out.log', // 普通日志路径
      merge_logs: true, // 合并日志（针对集群模式）
      max_memory_restart: '500M', // 内存占用超出限制时重启
      restart_delay: 5000, // 重启延迟（防止频繁重启）
    },
  ],
};
