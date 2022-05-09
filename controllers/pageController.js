const req = require("express/lib/request");
const Course = require('../model/Course')
const User = require('../model/User')

const nodemailer = require('nodemailer')


exports.getAboutPage = (req, res) => {
    res.status(200).render('about', { page_name: 'about' });
};

exports.getIndexPage = async (req, res) => {
    const courses = await Course.find().sort('-createdAt').limit(2)
    const totalCourses = await Course.find().countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' })
    const totalTeachers = await User.countDocuments({ role: 'teacher' })
    res.status(200).render('index', {
        page_name: 'index',
        courses,
        totalCourses,
        totalStudents,
        totalTeachers
    });
};
exports.getRegisterPAge = (req, res) => {
    res.status(200).render('register', { page_name: 'register' });
};
exports.getLoginPage = (req, res) => {
    res.status(200).render('login', { page_name: 'login' });
};
exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact',
    });
};
exports.sendEmail = async (req, res) => {
    try {
        const outputMessage = `
    <h1>Mail Details</h1>
    <ul>
        <li>Name: ${req.body.name} </li>
        <li>Email: ${req.body.email} </li>
    </ul>
    <h1>Message </h1>
    <p>${req.body.message} </p>
    
    `
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "musty1406@gmail.com", // gmail hesabı
                pass: "hcyfuijlfizjkpdu", // gmail şifresi veya uygulama şifresi
            },
        });

        let info = await transporter.sendMail({
            from: '"Smart Edu Contact Form " <musty1406@gmail.com>', // sender address
            to: "musty1406@yandex.com", // list of receivers
            subject: "Smart EDU Contact Form New Message ✔", // Subject line
            html: outputMessage, // html body
        });
        req.flash("success", "We Received your message succesfully");

        res.status(200).redirect('contact');
    } catch (err) {
        //req.flash("error", `Something happened! ${err}`);
        req.flash("error", `Something happened!`);
        res.status(200).redirect('contact');
    }
};


