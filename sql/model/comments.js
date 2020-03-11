const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    topic_id: { type:String }, // 评论文章id
    content: { type: String }, // 评论内容
    from_uid: { type: String }, // 评论用户
    status: { type: String }, // 评论状态 (是否被删除了)
    praise_num: { type: String }, // 评论点赞量
    create_time: { type: String } // 评论时间
});
// 执行时 会在数据库中创建 users 集合
module.exports = mongoose.model('Comment', CommentSchema);