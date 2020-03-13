var express = require('express');
var router = express.Router();

/* GET user page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
router.get('/contarct', function(req, res, next) {
  res.render('contarct');
});
router.get('/blogList', function(req, res, next) {
  res.render('blogList');
});

module.exports = router;
