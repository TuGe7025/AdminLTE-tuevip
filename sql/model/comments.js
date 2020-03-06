const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    tid: { type: String },
    cid: { type: String },
    uid: { type: String },
    ccontent: { type: String },
    cstate: { type: String }
});
// 执行时 会在数据库中创建 users 集合
module.exports = mongoose.model('comment', UserSchema);