var express = require('express');
var router = express.Router();

/* GET user page. */
router.get('/', function(req, res, next) {
  res.render('journal', { aindex:2});
});

module.exports = router;
