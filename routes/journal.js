var express = require('express');
var router = express.Router();
const sql = require('../sql');
const Articles = require('../sql/model/articles');
var ObjectId = require('mongodb').ObjectId;
/* GET user page. */
router.get('/', function(req, res, next) {
    sql.find(Articles,{},{}).then((data) => {
        var odata = JSON.stringify(data)
        res.render('journal', { aindex:2, data: odata})
    })
});
router.get('/add', function(req, res, next) { 
    res.render('articlesAdd',{aindex:2});
})
router.get('/update', function(req, res, next) {
    var _id = ObjectId(req.query.id);
    sql.find(Articles,{_id:_id},{}).then((odata) => {
        let d = JSON.stringify(odata[0]);
        let data = JSON.parse(d);
        res.render('articlesUpdate', { aindex:2,
            title_id: data.title_id, // 标题id
            content: data.content, // 内容
            img: data.img, // 内容
            from_uid: data.from_uid, // 用户
            classify: data.classify, // 分类
            tagslabel: data.tagslabel, // 标签
            praise_num: data.praise_num, // 点赞量
            create_time: data.create_time, // 时间
            _id:data._id
        })
    }) 
})
router.post('/update', function(req, res, next) { 
    let data = JSON.parse(req.body.text);
    var _id = ObjectId(data._id);
    console.log(data)
    sql.update(Articles,{_id:_id},{$set:{
        title_id: data.title_id, // 文章标题id
        content: data.content, // 评论内容
        img: data.img, // 评论内容
        classify: data.classify, // 分类
        tagslabel: data.tagslabel, // 标签
    }}).then(()=>{})
    res.send({code:'1',data:data})
})
router.post('/add', function(req, res, next) {
    let data = JSON.parse(req.body.text);
    var time = new Date().getTime();
    var praise_num = praise_num ? praise_num : '0'; 
    var status = status ? status : '1';
    let json = {
        title_id: data.title_id, // 文章标题id
        content: data.content, // 评论内容
        img: data.img, // 评论内容
        from_uid: data.from_uid, // 评论用户
        classify: data.classify, // 分类
        tagslabel: data.tagslabel, // 标签
        status: '1', // 评论状态 (是否被删除了)
        praise_num: '0', // 评论点赞量
        create_time: getMyDate(parseInt(time)) // 评论时间
    }
    const articles = new Articles(json)
    sql.insert(articles).then(()=>{})
    console.log(json)
    res.send({code: '1',data: json})
    // sql.find(Articles,{_id: _id}).then((data)=> {
    //   if (data.length == 0) {
    //   }
    //     // sql.update(articles,{_id:_id},{$set:{title_id: title_id,content: content,from_uid: from_uid,status: status,praise_num: praise_num,}}).then(()=>{})
    // })
    // res.send({code:'1'});
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
