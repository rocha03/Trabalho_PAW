const jwt = require('jsonwebtoken');
const conf = require('../../jwt_secret/config');
const User = require('../../models/user');

const requireAdmin = (req, res, next) => {
    const token = req.cookies.jwt;

    /* Check if cookie (yummy) exists and is verified */
    if (token) {
        jwt.verify(token, conf.secret, (err, decodedToken) => {
            if (err) res.redirect('/auth/login');
            if (decodedToken.admin === true) {
                next();
            } else {
                res.redirect('/admin/notadmin');
            }
        });
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = { requireAdmin };