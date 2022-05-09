
const authController = require('../controllers/authController')
const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const User = require('../model/User')
const { body } = require('express-validator');

router.route('/signup').post([

    body('name').not().isEmpty().withMessage('Please Enter Your Name'),

    body('email').isEmail().withMessage('Please Enter Valid Email')
        .custom((userEmail => {
            return User.findOne({ email: userEmail }).then(user => {
                if (user) {
                    return Promise.reject('Email is already exists!')
                }
            })
        }))

    ,

    body('email').not().isEmpty().withMessage('Please Enter A Password'),

], authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authMiddleware, authController.getDashbordPage)
module.exports = router