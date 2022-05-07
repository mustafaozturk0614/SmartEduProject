const bcrypt = require('bcrypt');
const User = require('../model/User');
const Category = require('../model/Category');
const Course = require('../model/Course');
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).redirect('/login')
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
                    res.redirect('/users/dashboard')
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

exports.getDashbordPage = async (req, res) => {
    const categories = await Category.find()
    const user = await User.findOne({ _id: req.session.userID }).populate('courses')
    const courses = await Course.find({ user: req.session.userID })
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
        user: user,
        categories: categories,
        courses, courses
    });
};

