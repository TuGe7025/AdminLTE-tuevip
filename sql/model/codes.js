const mongoose = require('../db.js');
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
    // username: { type: String },
    email: { type: String },
    icode: { type:Number }
});
// 执行时 会在数据库中创建 users 集合
module.exports = mongoose.model('Code', CodeSchema);