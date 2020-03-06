const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    isLive: { type:String },
    imgurl: { type: String},
    time:{ type: Number }
});
// 执行时 会在数据库中创建 users 集合
module.exports = mongoose.model('User', UserSchema);