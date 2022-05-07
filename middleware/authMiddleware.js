const User = require('../model/User');

module.exports = (req, res, next) => {
    User.findById(req.session.userID, (err, user) => {
        if (err || !user) return res.redirect('/login');
        next();
    });
};
