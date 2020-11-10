const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title_id: { type:String }, // 文章标题
    content: { type: String }, // 发表内容
    img: { type: String }, // 封面
    from_uid: { type: String }, // 发表用户
    status: { type: String }, // 发表状态 (是否被删除了)
    classify: { type: String }, // 分类
    tagslabel: { type: Array }, // 标签
    num: { type: String }, // 发表点击量
    comments: { type: String }, // 评论量
    praise_num: { type: String }, // 发表点赞量
    create_time: { type: String } // 发表时间
});
// 执行时 会在数据库中创建 users 集合
module.exports = mongoose.model('Article', ArticleSchema);