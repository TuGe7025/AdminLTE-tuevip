const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/tuge7025';

mongoose.connect(DB_URL, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('数据库已经连接成功');
});
mongoose.connection.on('disconnected', () => {
    console.log('数据库连接失败');
});
mongoose.connection.on('error', () => {
    console.log('数据库连接异常');
});

module.exports = mongoose;