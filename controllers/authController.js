const User = require('../model/User');
const bcrypt = require('bcrypt')
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            user,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    req.session.userID = user._id;
                    if (same) { res.redirect('/') }
                })
            }
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.logoutUser = async (req, res) => {
    req.session.destroy(() => res.redirect('/'))
};

