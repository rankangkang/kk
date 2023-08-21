let config = require('./webpack.config');

// 生产模式
config.mode = 'production';
config.devtool = false;

module.exports = config;