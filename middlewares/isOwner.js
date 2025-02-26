const User = require('../models/user-model');

module.exports = async function isOwner(req, res, next) {
    if (!req.user) {
        req.flash('error', 'Unauthorized access');
        return res.redirect('/user/login');
    }

    // Get the first registered user
    const firstUser = await User.findOne().sort({ _id: 1 });

    if (!firstUser || firstUser._id.toString() !== req.user._id.toString()) {
        req.flash('error', 'Access denied. Only the owner can access this page.');
        return res.redirect('/');
    }

    next();
};
