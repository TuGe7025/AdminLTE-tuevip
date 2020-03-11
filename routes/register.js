var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const sql = require('../sql');
const User = require('../sql/model/users');
const iCode = require('../sql/model/codes');
/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('register',{ucode:false,ecode:false,pcode:false,p2code:false,tcode:''});
});
router.post('/reg', function(req, res, next) {
  let { username, email, password, password2 } = req.body;
  var oCode = `${req.body.oCode}`
  var datenum = new Date().getTime();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(password,salt);
  var json = {
      username: username,
      password: hash,
      email: email,
      isLive: "on",
      imgurl: "/static/images/head.jpg",
      time:`${datenum}`
  }
    const user = new User(json) // 实例化插入数据，传入的是插入的对象
    if(oCode == '') { //当传入验证码为空时
      res.render('register',{ucode: username,ecode: email,pcode: password,p2code: password2,tcode:'请输入验证码！请重新发送验证码后提交'});
    } else {
      sql.find(iCode,{email: email},{_id:0,__v:0}).then((idata) => { // 查询验证库
        if(idata.length <= 0) {   //没有该邮箱时
          res.render('register',{ucode: username,ecode: email,pcode: password,p2code: password2,tcode:'请重新发送验证码'});
        } else if(idata[0].icode==oCode){ // 查询到的和用户输入的一致时
          sql.find(User,{username: username},{_id:0,__v:0}).then((data) => { // 查询用户是否存在
            if(data.length > 0) { //有相同用户名时
                res.render('register',{ucode: '用户名已存在',ecode: email,pcode: password,p2code: password2,tcode:''});
            } else {
                sql.insert(user).then(() => { // 存入数据库
                })
                res.render('login',{yes:"注册成功~！"})
            }
          }).catch(()=> {
            res.render('register');
          })
        } else {
          res.render('register',{ucode: username,ecode: email,pcode: password,p2code: password2,tcode:'验证码错误！请重新发送验证码后提交'});
        }
});
      
    }
});
function getExpireTime () {
  let d = new Date()
  d.setTime(d.getTime() + 15 * 60 * 1000)
  return d.toUTCString()
}
module.exports = router;
