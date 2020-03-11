var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');//token
const sql = require('../sql');
const User = require('../sql/model/users');
/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login',{yes:""});
});
// 登录用户
// router.post('/', (req, res) => {
//   console.log(req.body)
//   let email = req.body.email;
//   let pass = req.body.password;
//   sql.find(User,{email: email}).then((data)=> {
//       if(data.length!=0){
//           let content={email: req.body.email};
//           let secretOrPrivateKey = "jwt";
//           let token = jwt.sign(content, secretOrPrivateKey, {
//               expiresIn: 60*60*24
//           });
//           console.log(data)
//           if (pass != data[0].password) {
//               res.send({code: '1', text: '密码错误'});
//               return false;
//           }
//           res.send({code: 'ok', token: token,username: data[0].username, email: data[0].email })
//       } else {
//           res.send({code: '0', text: '账户不存在!'});
//       }
//   })

// })
//每次切换都去调用此接口 用来判断token是否失效 或者过期
router.post('/checkUser', (req,res)=>{
  let token = req.get("Authorization"); // 从Authorization中获取token
  let secretOrPrivateKey="jwt"; // 这是加密的key（密钥）
  jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
      if (err) {  //  时间失效的时候 || 伪造的token
          res.send({'status':10010});
      } else {
          res.send({'status':10000});
      }
  })
});
module.exports = router;
