const bcrypt = require('bcrypt');
const User = require('../model/User');
const Category = require('../model/Category');
const Course = require('../model/Course');
const { validationResult } = require('express-validator');
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).redirect('/login')
    } catch (error) {
        const errors = validationResult(req);

        for (let i = 0; i < errors.array().length; i++) {
            req.flash("error", `${errors.array()[i].msg} `);
        }


        res.status(400).redirect('/register')
    }
};
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        req.session.userID = user._id;
                        res.redirect('/users/dashboard')
                    } else {
                        req.flash("error", "Your Password is not correct!");
                        res.status(400).redirect('/login')

                    }

                })
            } else {
                req.flash("error", "User is not exists!");
                res.status(400).redirect('/login')
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

