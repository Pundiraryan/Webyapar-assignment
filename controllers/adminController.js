const classroomModel = require("../models/classroomModel")
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const slugify = require("slugify");

const  showAdminHome=(req, res) =>{
    res.render("admin/index",{
        username: "---"
    })
}

const adminProfile=(req, res)=>{

    // const {user} = req.session;
    res.render("admin/profile",{
        username: "ADMINISTRATOR"
    })


}

const adminRegister=async (req,res)=>{
    try {
        const result=await classroomModel.find();
        if(result){
            res.render("admin/register",{
                classes: result
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const saveAdmin=async (req,res)=>{
    try {
        const {name, lastName, username, email, password, accountType, classroom, ext} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);

    const newAdmin=await userModel.create({
        profilePictureUrl: `profile_${username}.${ext}`,
        name: name,
        lastName:lastName,
        username: username,
        email: email,
        password: passwordHashed,
        accountType: accountType,
        group: classroom
    });

    if(newAdmin){
        res.redirect("/login")
    }else{
        console.log('error occured');
    }

    } catch (error) {
        console.log(error);
    }


}


const adminClassroomget= async (req,res)=>{

    const accountType = 2
    try {
       const result=await userModel.find({accountType:accountType});
        if(result){
            res.render("admin/registerClassroom",{
                teachers: result
            });
            
        }else{
            console.log('no user found');
        }
    } catch (error) {
        console.log(error);
    }

}

const adminClassroomSave =  async (req,res)=>{

    const {title, myteacher} = req.body;
    try {
        const result=await classroomModel.create({
            title: slugify(title),
            slug: slugify(title),
            teacher: myteacher
           });
        if(result){
            res.redirect("/home/admin");
        }else{
            console.log('classroom save failed');
        }
    } catch (error) {
        console.log(error);
    } 
 }

 const listClassrooms = async (req,res)=>{

    try {
        const result=await classroomModel.find();
        if(result){
            res.render("admin/classrooms",{
                classrooms: result
            });
        }else{
            console.log('no classromm present');
        }
    } catch (error) {
        console.log(error);
    }
    
 }

 const listClassroomMembers = async (req,res)=>{
    const title = req.params.title;
    const accountType = 3;
    try {
        const result=await userModel.find({
            accountType: accountType,
            group: title
        });
        if(result){
            res.render("admin/members",{
                title: title,
                members: result
            });
        }else{
            console.log('no classroom members');
        }
    } catch (error) {
        console.log(error);
    }

}

const getTeachersList = async (req,res)=>{
    try {
        const result=await userModel.find({accountType: '2'});
        if(result){
            res.render("admin/teachers",{
                teachers: result
            });
        }else{
            console.log('no teachers found');
        }
    } catch (error) {
        console.log(error);
    }

}

const getStudentsList= async  (req,res)=>{

    try {
        const result=await userModel.find({accountType: '3'});
        if(result){
            res.render("admin/students",{
                students: result
            });
        }else{
            console.log('no students found');
        }
    } catch (error) {
        console.log(error);
    }

}

const getAdminsList= async  (req,res)=>{

    try {
        const result=await userModel.find({accountType: '1'});
        if(result){
            res.render("admin/admins",{
                admins: result
            })
        }else{
            console.log('no students found');
        }
    } catch (error) {
        console.log(error);
    }

}

const getChangePassword = async (req, res)=>{
    const {username,email} = req.session.user;
    try {
        const result=await userModel.findOne({
            username,
            email
        });
        if(resukt){
            res.render('admin/password',{
                username: "--",
                password: result.password
            });
        }else{
            console.log('nothing is there')
        }
    } catch (error) {
        console.log(error);
    }
    
}

const postChangePassword = async (req, res)=>{
    const {username,email} = req.session.user;
    const {newPassword, newPasswordCopy} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(newPassword,salt);

    if(newPassword === newPasswordCopy)
    {
        const result= await userModel.findOne({username,email});
        if(result){
            result.password=passwordHashed;
            res.redirect("/home/admin/");
        }
        else{
            console.log('password update failed');
        }

    }
    else{
        res.send("the passwords don't math!")
    }

}

module.exports={showAdminHome,adminProfile,adminRegister,saveAdmin,adminClassroomget,adminClassroomSave,listClassrooms,listClassroomMembers,getTeachersList,getStudentsList,getAdminsList,getChangePassword,postChangePassword};
