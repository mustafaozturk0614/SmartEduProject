const express = require('express');
const mongoose = require('mongoose')

const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute')
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


//Middleware

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/', pageRoute);

app.use('/courses', courseRoute);


const port = 3000;
app.listen(port, () => {
    console.log(`App Started on port ${port}`);
});