var express = require('express');
const Service = require('../models/services');
const { requireAuth } = require('../public/scripts/auth');
var router = express.Router();
var serv;

/* GET dashboard page. */
router.get('/', requireAuth, function(req, res, next) {
  Service.find()
  .then(result => {
    res.render('dashboard', { title: 'Dashboard', services: result });
  })
  .catch(err => {
    res.render('404', { title: '404', message: err });
  })
});

module.exports = router;