
const authController = require('../controllers/authController')
const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.route('/signup').post(authController.createUser)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/dashboard').get(authMiddleware, authController.getDashbordPage)
module.exports = router