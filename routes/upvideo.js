var express = require('express');
var router = express.Router();
const sql = require('../sql');
const User = require('../sql/model/users');
const Upvideo = require('../sql/model/upvideo');
/* GET user page. */
router.get('/', function(req, res, next) {
  console.log(req.query)
  res.rend({code: '1'});
});

module.exports = router;
