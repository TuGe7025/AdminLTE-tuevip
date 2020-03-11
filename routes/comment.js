
var express = require('express');
var router = express.Router();
const sql = require('../sql');
const Comment = require('../sql/model/comments');
const Writebacks = require('../sql/model/writebacks');
const User = require('../sql/model/users');
router.post('/', function(req, res, next) {
    console.log(req.body)
    var time = new Date().getTime();
    let {topic_id,content,from_uid} = req.body;
    if(content == ''){
        return res.send({code: '0', data: '无输入内容'})
    }
    let json = {
        topic_id: topic_id, // 评论文章id
        content: content, // 评论内容
        from_uid: from_uid, // 评论用户
        status: '1', // 评论状态 (是否被删除了)
        praise_num: '0', // 评论点赞量
        create_time: getMyDate(parseInt(time)) // 评论时间
    }
    const comment = new Comment(json)
    sql.insert(comment).then(() => { // 存入数据库
    })
    sql.find(User,{username: from_uid}).then((data)=> { //查找数据库取出用户头像
        var userimg = data[0].imgurl
        return res.send({code: '1', data: comment, userimg: userimg });
    })

  });
router.post('/hf', function(req, res, next) {
    var time = new Date().getTime();
    console.log(req.body)
    let {comment_id, content, from_uid, to_uid} = req.body
    let reply_type = 'reply'; //针对回复的回复(reply)
    to_uid = to_uid ? to_uid : '';
    if (to_uid == ''){
        reply_type = 'comment;'; //针对评论的回复(comment)
    }
    let json = {
        comment_id: comment_id, //评论id
        reply_type: reply_type, // 表示回复的类型
        content: content, //回复内容
        from_uid: from_uid, //回复用户id
        to_uid: to_uid, //目标用户id
        status: '1', // 回复状态 (是否被删除了)
        praise_num: '0', // 回复点赞量
        create_time: getMyDate(parseInt(time)) // 评论时间
    }
    const writebacks = new Writebacks(json)
    sql.insert(writebacks).then(() => { // 存入数据库
    })
    sql.find(User,{username: from_uid}).then((data)=> { //查找数据库取出用户头像
        var userimg = data[0].imgurl
        return res.send({code: '1', data: writebacks, userimg: userimg });
    })

})
function getMyDate(str) {
    var oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth()+1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay) +' '+ addZero(oHour) +':'+
addZero(oMin) +':'+addZero(oSen);
    return oTime;
}
//补零操作
function addZero(num){
    if(parseInt(num) < 10){
        num = '0'+num;
    }
    return num;
}
  module.exports = router;