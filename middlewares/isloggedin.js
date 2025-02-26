const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

module.exports = async function isLoggedIn(req, res, next) {
    if (!req.cookies || !req.cookies.token) {
        req.flash('error', 'You need to login first.');
        return res.redirect('/user/login');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            req.flash('error', 'You need to register first.');
            return res.redirect('/user/register');
        }

        // Store user in req
        req.user = user;
        next();
    } catch (error) {
        req.flash('error', 'Invalid or expired session. Please login again.');
        return res.redirect('/user/login');
    }
};
