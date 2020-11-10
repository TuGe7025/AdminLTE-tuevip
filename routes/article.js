var express = require('express');
var router = express.Router();
const sql = require('../sql');
const Articles = require('../sql/model/articles');
var ObjectId = require('mongodb').ObjectId;
/* GET user page. */
router.get('/', function(req, res, next) {
  res.render('articles',{aindex:2});
});
router.post('/', function(req, res, next) {
  let {title_id,content,from_uid,praise_num,status,article_id} = req.body;
  var time = new Date().getTime();
  praise_num = praise_num ? praise_num : '0'; 
  num = num ? num : '0'; 
  comments = comments ? comments : '0'; 
  status = status ? status : '1';
  if(article_id) {
    var _id = ObjectId(article_id);
  } else {
    article_id = article_id ? article_id : '';
  }
  let json = {
      title_id: title_id, // 文章标题id
      content: content, // 文章内容
      from_uid: from_uid, // 用户
      status: status, // 文章状态 (是否被删除了)
      praise_num: praise_num, // 文章点赞量
      num: num, // 文章点击量
      comments: comments, // 文章评论量
      create_time: getMyDate(parseInt(time)) // 文章时间
  }
  const articles = new Articles(json)
  sql.find(Articles,{_id: _id}).then((data)=> {
    if (data.length == 0) {
      sql.insert(articles).then(()=>{})
    } else {
      sql.update(articles,{_id:_id},{$set:{title_id: title_id,content: content,from_uid: from_uid,status: status,praise_num: praise_num,}}).then(()=>{})
    }
  })
    res.send({code:'1',data:articles})
});
function getMyDate(str) {
      var oDate = new Date(str),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth()+1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      oTime = oYear +'/'+ addZero(oMonth) +'/'+ addZero(oDay) +' '+ addZero(oHour) +':'+
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
