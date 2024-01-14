const express = require("express");
const connectToMongo = require("./db/connection");
const session = require("express-session");
const dotenv = require('dotenv');
const maxAge = 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000;

const userRouter=require('./routes/userRoutes');
const studentRouter=require('./routes/studentRoutes');
const teacherRouter=require('./routes/teacherRoutes');
const adminRouter=require('./routes/adminRoutes');


const app = express();
dotenv.config();

connectToMongo();


app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: maxAge },
}))
//Routes

app.use("/", userRouter);
app.use("/", studentRouter);
app.use("/", teacherRouter);
app.use("/", adminRouter);

app.get("/", (req, res) => {

    req.session.user = {
        accountType: 100
    }
    res.render("index")
})


//download files route 
app.get("/download/:url", (req, res) => {

    const url = req.params.url;
    const path = `./public/assignments/${url}`;


    res.download(path)

})

//download submissions
app.get("/submission/:url", (req, res) => {

    const url = req.params.url;
    const path = `./public/assignments/${url}`;


    res.download(path)

})

app.get("*", (req, res) => {
    res.render("notfound")
})

app.listen(process.env.PORT, () => {
    console.log(`server running on http://localhost:${process.env.PORT}`)
})

