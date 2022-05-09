
const courseController = require('../controllers/courseController')
const express = require('express')
const router = express.Router();
const rolemiddleware = require('../middleware/roleMiddleware')

router.route('/').post(rolemiddleware(["teacher", "admin"]), courseController.createCourse)
router.route('/').get(courseController.getAllCourses)
router.route('/:slug').get(courseController.getCourse)
router.route('/:slug').delete(courseController.deleteCourse)
router.route('/:slug').put(courseController.updateCourse)
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);
module.exports = router