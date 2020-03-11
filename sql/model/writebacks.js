const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const WritebackSchema = new Schema({
    comment_id: {type: String}, //评论id
    reply_type: {type: String}, // 表示回复的类型
    reply_id: {type: String}, //回复目标id
    content: {type: String}, //回复内容
    from_uid: {type: String}, //回复用户id
    to_uid: {type: String}, //目标用户id
    status: { type: String }, // 回复状态 (是否被删除了)
    praise_num: { type: String }, // 回复点赞量
    create_time: { type: String } // 回复时间
});
// 执行时 会在数据库中创建 users 集合
module.exports = mongoose.model('Writeback', WritebackSchema);