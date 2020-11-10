var express = require('express');
var router = express.Router();
const sql = require('../sql');
const Articles = require('../sql/model/articles');
/* GET user page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
router.get('/contarct', function(req, res, next) {
  res.render('contarct');
});
router.get('/blogList', function(req, res, next) {
  sql.find(Articles,{},{}).then(data=>{
    var d = JSON.stringify(data)
    var d_lenth = '';
    d_lenth = data.length;
    res.render('blogList',{data: d,d_lenth:d_lenth});
  })
});
router.get('/paging', function(req, res, next) {
  let { page, count }  = req.query; // 页码
  page = page * 1 || 1;
  count = count * 1 || 4;
  sql.paging(Articles,{},{}, count, page).then(d=>{
    var d_lenth = '';
    sql.find(Articles,{},{}).then(data=>{
      d_lenth = data.length;
      res.send({code: '1', data: d, d_lenth: d_lenth});
    })
  })
});

module.exports = router;
