var express = require('express');
var router = express.Router();

//pass to controllers
const User = require('../../models/user');
const bcrypt = require('bcrypt');

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('auth/register', { title: 'Register' });
});

/* POST a user */
router.post('/', (req, res, next) => {

  const hashpass = bcrypt.hashSync(req.body.pass, 10);
  req.body.pass = hashpass;

  const user = new User(req.body);

  user.save()
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch(err => {
      console.log(err);
    });
})

module.exports = router;