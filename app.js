const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOvveride = require('method-override')

const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();

mongoose
    .connect('mongodb://localhost/smartedu-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,



    })
    .then(() => {
        console.log('DB Connected Successfully');
    });

//Template Engine

app.set("view engine", "ejs")


//Global Variable
global.userIN = null



//Middleware

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://dbUser:6djSv2QgySCLUW1b@cluster0.n0xb5.mongodb.net/smartedu-db?retryWrites=true&w=majority' })

}))
app.use('*', (req, res, next) => {
    userIN = req.session.userID
    next()
})
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
})
app.use(methodOvveride('_method', {
    methods: ['POST', 'GET'],
}))

app.use('/', pageRoute);

app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App Started on port ${port}`);
});