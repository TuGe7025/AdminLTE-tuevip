
var express = require('express');
var sendemail = require('./sendMail');
var router = express.Router();
const sql = require('../sql');
const Code = require('../sql/model/codes');
const User = require('../sql/model/users');
const check = {} //声明一个对象缓存邮箱和验证码，留着
/* GET login page. */
router.get('/', function(req, res, next) {
    var email = req.query.email;
    // var username = req.query.username;
    var icode = parseInt(('000000' + Math.floor(Math.random() * 999999)).slice(-6)) //生成随机验证码

    // sql.find(User,{username: username},{_id:0,__v:0}).then((idata) => {
    //     if(idata.length > 0 ){
    //         res.send({data:'0'})
    //     } else {
            sql.find(User,{email: email},{_id:0,__v:0}).then((udata) => {
                if(udata.length > 0 ){
                    res.send({code:'1'})
                } else {
                    sql.find(Code,{email: email},{_id:0,__v:0}).then((edata) => {
                        var datenum = new Date().getTime();
                        var json = {
                            // username: username,
                            email: email,
                            icode: icode,
                        }
                        const code = new Code(json)
                        if(edata.length == 0) {
                            sql.insert(code).then(() => { // 存入数据库
                            })
                        } else if(edata.length >= 1) {
                            // 当已存在邮箱时修改验证码
                            sql.update(Code,{email: email},{$set:{icode: icode}},'updateOne').then(() => {
                            })
                        }
                        //准备发送邮箱
                        if (!email) {
                            return res.send('参数错误')
                        } //email出错时或者为空时
                        check[email] = icode
                        //发送邮件
                        sendemail.sendMail(email, icode, (state) => {
                            if (state) {
                                return res.send("发送成功")
                            } else {
                                return res.send({code:'0'})
                            }
                            
                        })
                    })
                }
            }).catch(()=> {
                res.render('register',{tcode: 'error'});
            })
    //     }
    // })

})

module.exports = router;
