const Course = require("../model/Course");
const Category = require("../model/Category");




exports.createCourse = async (req, res) => {


    try {
        const course = await Course.create(req.body);
        res.status(200).json({
            status: 'success',
            course
        })
    } catch (error) {
        res.status(400).json({
            status: 'Bad Request',
            error,
        });
    }
};


exports.getAllCourses = async (req, res) => {

    try {

        const categorySlug = req.query.categories;
        const category = await Category.findOne({ slug: categorySlug })

        let filter = {}

        if (categorySlug) {

            filter = { category: category.id }
        }

        const courses = await Course.find(filter);
        const categories = await Category.find()

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses',
        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad Request',
            error,
        });
    }
};

exports.getCourse = async (req, res) => {

    try {
        const course = await Course.findOne({ slug: req.params.slug });

        res.status(200).render('course', {
            course,
            page_name: 'course',

        });
    } catch (error) {
        res.status(400).json({
            status: 'Bad Request',
            error,
        });
    }
};
