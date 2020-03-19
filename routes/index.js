var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');//token
const sql = require('../sql');
const User = require('../sql/model/users');
const Comment = require('../sql/model/comments');
const Writebacks = require('../sql/model/writebacks');
router.get('/', function(req, res, next) {
  res.render('index',{aindex:0});// 验证成功了
})
router.get('/please',(req, res) => {
  var arr = []
  sql.find(Comment,{topic_id: '7025'}).then((data)=> {
    data.forEach(element => {
      arr.push(element)
    })
    sql.find(Writebacks,{}).then((wdata)=> {
      wdata.forEach(element => {
        arr.push(element)
      })
      var json = JSON.stringify(listPush(arr))
      // res.render('index',{aindex:0,cdata: json,userimg: data[0].imgurl});// 验证成功了
      // sql.find(User,{username: element.from_uid}).then((data)=> {
        // res.render('index',{aindex:0,cdata: json,userimg: data[0].imgurl});// 验证成功了
      // })
      res.render('please',{wdata:json})
    })
   
    // console.log(data)
  })
  // res.render('please')
})
//每次切换都去调用此接口 用来判断token是否失效 或者过期
router.post('/checkUser', (req,res)=>{
  // let token = req.get("Authorization"); // 从Authorization中获取token
  let token = req.body.token; // 从Authorization中获取token
  let secretOrPrivateKey="jwt"; // 这是加密的key（密钥）
  jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
      if (err) {  //  时间失效的时候 || 伪造的token
          res.send({'status':10010});
      } else {
          res.send({'status':10000});
      }
  })
});
function getExpireTime () {
  let d = new Date()
  d.setTime(d.getTime() + 15 * 60 * 1000)
  return d.toUTCString()
}
// 将查询数据改树形结构
function listPush(d){
  var newData = [];
  d.forEach(function(v, i){
      var n;
      for (var i = 0; i < newData.length; i++) {
          var t = newData[i];
          if (t._id==v.comment_id) {
              n = t;
              break;
          }
      }
      if (!n) {
          n = {list:[], _id:v._id ,from_uid: v.from_uid, create_time: v.create_time, praise_num: v.praise_num, content: v.content};
          newData.push(n);
      }
      if(v.comment_id){
          n.list.push(v);
      }
  })
  return newData
}
module.exports = router;
