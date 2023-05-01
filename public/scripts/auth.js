const jwt = require('jsonwebtoken');
const conf = require('../../jwt_secret/config');
const User = require('../../models/user');

const maxAge = 24 * 60 * 60;

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    /* Check if cookie (yummy) exists and is verified */
    if (token) {
        jwt.verify(token, conf.secret, (err, decodedToken) => {
            if (err) res.redirect('/auth/login');
            next();
        });
    } else {
        res.redirect('/auth/login');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    /* Check if cookie (yummy) exists and is verified */
    if (token) {
        jwt.verify(token, conf.secret, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            }
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            next();
        });
    } else {
        res.locals.user = null;
        next();
    }
}

/* Handle Errors */
const handleErrors = (err) => {
    let errs = { username: '', email: '', pass: '' };

    /* login error */
    if (err.message.includes('Email or Password incorrect.')) {
        return { msg: 'Email or Password incorrect.' };
    }

    /* duplicate user (email) error handeling */
    if (err.code === 11000) {
        errs.email = 'Email already in use.';
        return errs;
    }

    /* error validation */
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errs[properties.path] = properties.message;
        });
    }

    return errs;
}

/* Create Cookies (yummy) */
const createToken = (id, admin) => {
    return jwt.sign({ id, admin }, conf.secret, {
        expiresIn: maxAge
    })
}

module.exports = { requireAuth, checkUser, handleErrors, createToken, maxAge };