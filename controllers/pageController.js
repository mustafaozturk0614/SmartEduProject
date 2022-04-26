exports.getAboutPage = (req, res) => {
    res.status(200).render('index', { page_name: 'about' });
};
exports.getIndexPage = (req, res) => {
    res.status(200).render('index', { page_name: 'index' });
};

