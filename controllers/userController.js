const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");

const deniedAcess = (req, res) => {
    res.render("forbidden")
}

const userLogout= (req, res) => {
    req.session.destroy()
    res.redirect("/")
}

const Authenticate= async (req, res) => {

    const { email, password } = req.body;

    const lowerEmail = email.toLowerCase()

    try {
        const user=await userModel.findOne({
            email: lowerEmail
    });

    if(user !== undefined && user !== null){
        const correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    username: user.username,
                    email: user.email,
                    accountType: user.accountType,
                    profilePicture: user.profilePictureUrl,
                    id: user.id


                }
                console.log("====LOGGED====")
                res.redirect("/home")
            }
            else {
                res.send("incorrect")
            }
        }
        else{
            res.redirect("/login")
    }


    } catch (error) {
       console.log(error) 
    }
    
}

const getHome = (req, res) => {



    const { accountType } = req.session.user;
    const type = Number(accountType);



    switch (type) {
        case 1://if admin

            res.redirect("/home/admin");

            break;

        case 2://if teacher
            res.redirect("/home/teacher");

            break;

        case 3://if student
            res.redirect("/home/student");

            break;
    }


}

const getProfile= (req, res) => {
    const user = req.session.user;
    res.render("./user/profile", {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
    })
}

const userLogin= (req, res) => {
    res.render("login");
}

const changePassword= (req, res) => {
    const { username } = req.session.user;

    res.send('password', {
        username
    })
}

module.exports={deniedAcess,userLogout,Authenticate,getHome,getProfile,userLogin,changePassword}