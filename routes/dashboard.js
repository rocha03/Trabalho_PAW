var express = require('express');
var router = express.Router();
var serv;

/* GET dashboard page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;