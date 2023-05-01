var express = require('express');
const { requireAuth } = require('../public/scripts/auth');
const userController = require('../controllers/user');
var router = express.Router();

/* GET users listing. */
router.get('/servico/:id', requireAuth, userController.service_get);

module.exports = router;
