const middleware =  require("../middleware/adminMiddleware")
const express = require("express");
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const { showAdminHome, adminProfile, adminRegister, saveAdmin, adminClassroomget, adminClassroomSave, listClassrooms, listClassroomMembers, getTeachersList, getStudentsList, getAdminsList, getChangePassword, postChangePassword } = require("../controllers/adminController");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/profile')
    },
    filename: function (req, file, cb) {
     
      cb(null, "profile_"+req.body.username+ path.extname(file.originalname))
    }
  })

const upload = multer({storage: storage});


Router.get("/home/admin", middleware,showAdminHome);


// profile routes

Router.get("/home/admin/profile", middleware, adminProfile);



// user register users
Router.get("/home/admin/register_user",  adminRegister);
//save users
Router.post("/home/admin/register_user/save",upload.single('profilePicture'),saveAdmin)
// classroom section
Router.get("/home/admin/register_classroom",middleware,adminClassroomget)

// save classroom

Router.post("/home/admin/register_classroom/save",middleware,adminClassroomSave)

//list classrooms
Router.get("/home/admin/classrooms_list", middleware, listClassrooms)

//list classroom members
Router.get("/home/admin/classroom/:title", middleware,listClassroomMembers)
// validateRegister
// this route contain a validation middleware 


// list users routes

Router.get("/home/admin/teachers_list",middleware, getTeachersList)

Router.get("/home/admin/students_list",middleware,getStudentsList)

Router.get("/home/admin/administrators_list",middleware, getAdminsList)

//change passwd
Router.get("/home/admin/change_password", getChangePassword)

Router.post("/home/admin/change_password", postChangePassword)

module.exports = Router;