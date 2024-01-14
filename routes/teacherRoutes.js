const express = require("express");
const Router = express.Router();
const middleware = require("../middleware/teachermiddleware")
const slugify = require("slugify");

//area multer

const multer = require("multer");
const path = require("path");
const { getHome, writeNotice, saveNotice, submitTask, getNewtasks, getAllTasks, findTaskById, getProfile, getAllClassrooms, getAllClassroomById, getChangePassword, postChangePassword } = require("../controllers/teacherController");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/tasks')
    },
    filename: function (req, file, cb) {
        console.log(slugify(req.body.title) + "===")
        cb(null, "task_" + slugify(req.body.title) + "_" + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });


Router.get("/home/teacher", middleware, getHome)


Router.get("/home/teacher/write_notice", middleware, writeNotice)

Router.post("/home/teacher/save_notice", middleware, saveNotice)

Router.post('/home/teacher/class/upload', middleware, upload.single('formFile'), submitTask)


//tasks routes
Router.get("/home/teacher/task/new", middleware, getNewtasks)

Router.get("/home/teacher/tasks", middleware,getAllTasks )

Router.get("/home/teacher/task/:id", middleware,findTaskById )

//profile routes
Router.get("/home/teacher/profile", middleware, getProfile)

//classroom routes
Router.get("/home/teacher/classrooms", middleware, getAllClassrooms)

Router.get("/home/teacher/classroom/:id", middleware, getAllClassroomById);

// change pass
Router.get("/home/teacher/change_password", middleware, getChangePassword);

Router.post("/home/teacher/change_password", middleware, postChangePassword);


module.exports = Router;