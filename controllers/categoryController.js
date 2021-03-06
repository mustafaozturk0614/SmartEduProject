const Category = require("../model/Category");





exports.createCategory = async (req, res) => {


    try {
        const category = await Category.create(req.body);
        res.status(201).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'Bad Request',
            error,
        });
    }
};


exports.getAllCategory = async (req, res) => {

    try {
        const categories = await Category.find();

        res.status(200).render('categories', {
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
exports.deleteCategory = async (req, res) => {
    try {

        await Category.findByIdAndRemove(req.params.id)
        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};