const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const UpvideoSchema = new Schema({
    videoUrl: { type:String }, // 视频地址
    videoId: { type: String }, // 视频id
    videoName: { type: String }, // 视频名
    userName: { type: String }, // 上传用户
    audit: { type: String }, // 审核是否通过
    create_time: { type: String } // 时间
});
// 执行时 会在数据库中创建 users 集合
module.exports = mongoose.model('Upvideo', UpvideoSchema);