var express = require('express');
var router = express.Router();
const sql = require('../sql');
const User = require('../sql/model/users');
/* GET user page. */
router.get('/', function(req, res, next) {
  console.log()
  res.render('user', { aindex: 1 });
});

module.exports = router;
