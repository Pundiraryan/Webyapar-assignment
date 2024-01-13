
const express=require('express');
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const { deniedAcess, userLogout, Authenticate, getHome, getProfile, userLogin, changePassword } = require("../controllers/userController");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profile')
    },
    filename: function (req, file, cb) {

        cb(null, "profile_" + req.body.username + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });


// register user

// denied acess 403

Router.get("/forbidden",deniedAcess )

// logout

Router.get("/logout", userLogout)
//this route does the authentication
Router.post("/authentication",Authenticate )

// home - this does redirection by type-based account



Router.get("/home", getHome)





//Profile Routes

Router.get("/profile", getProfile)

//Login route

Router.get("/login", userLogin)


//change passwd
Router.get("/change_password",changePassword )

module.exports = Router;