var express = require('express');
var router = express.Router();
const authcontroller = require('../controllers/auth');

router.get('/login', authcontroller.login_get);
router.post('/login', authcontroller.login_post);

router.get('/register', authcontroller.register_get);
router.post('/register', authcontroller.register_post);

router.get('/logout', authcontroller.logout_get);

module.exports = router;