var express = require('express');
var router = express.Router();

/* GET home page. */

module.exports = router.get('/', function (req, res) {
  res.send(200, ' res.send ');
});;
