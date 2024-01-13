const express = require("express");
const Router = express.Router();
const middleware = require("../middleware/studentMiddleware")
const path = require("path");
const multer = require("multer");
const { getStudentHome, getStudentProfile, getClassroomNotices, viewNoticeById, getAllTasks, showTaskById, submittask, getMarks, getChangePassword, postChangePassword } = require("../controllers/studentController");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/submission')
    },
    filename: (req, file, cb) => {
        cb(null, 'submission_' + req.body.owner + path.extname(file.originalname))
    }
});

const upload = multer({
    storage, limits: {
        fileSize: 524288//5MB
    }
})

Router.get("/home/student", middleware, getStudentHome)

Router.get("/home/student/profile", middleware,getStudentProfile )

Router.get("/home/student/classroom_notices", middleware,getClassroomNotices )


//view notice by id

Router.get("/home/student/classroom_notice/:id", middleware, viewNoticeById)

// view  all tasks

Router.get("/home/student/tasks", middleware,getAllTasks )

Router.get("/home/student/task/:id", middleware, showTaskById )


Router.post("/home/student/task/submit", middleware, upload.single('submission'), submittask)

//marks
Router.get("/home/student/marks", getMarks)

//change pass
Router.get("/home/student/change_password", middleware,getChangePassword )

Router.post("/home/student/change_password", middleware,postChangePassword )

module.exports = Router;