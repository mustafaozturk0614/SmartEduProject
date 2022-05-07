
const pageController = require('../controllers/pageController')
const redirectMiddleware = require('../middleware/redirectMiddleware.js')

const express = require('express')

const router = express.Router();


router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/register').get(redirectMiddleware, pageController.getRegisterPAge)
router.route('/login').get(redirectMiddleware, pageController.getLoginPage)
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEmail);
module.exports = router