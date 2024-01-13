const bcrypt = require('bcrypt')
const userModel=require('../models/userModel')
const noticeModel=require('../models/noticeModel')
const taskModel=require('../models/taskModel')
const submissionModel=require('../models/submisssionModel');

const getStudentHome= (req, res) => {
    res.render("student/index", {
        username: req.session.user.username
    });
}

const getStudentProfile =(req, res) => {

    const user = req.session.user;
    res.render("student/profile", {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
    });
}

const getClassroomNotices = async (req, res) => {
    const accountType = '3';
    const { username } = req.session.user;

    console.log(username + "USER--")

    try {
        
        const student = await userModel.findOne({

            username: username
    });
    if(student){
        try {

            const notices=await noticeModel.find({
                receiver: student.group,
                order: [['id', 'DESC']]
            });
            if(notices){
                
                res.render('student/noticesportal', {
                    notices
                })
            }else{
                console.log('no notices found');
            }
            
        } catch (error) {
            console.log(error)
        }
        
    }else{
        console.log('student not found');
    }

    } catch (error) {
        console.log(error);
    }

}

const viewNoticeById= async (req, res) => {

    const noticeId = req.params.id;

    try {
        
        const noticeFound=noticeModel.findOne({
                id: noticeId
        });
        if(noticeFound){

            res.render("student/notice", {
                noticeFound
            })
        }else{
            console.log('no notice found');
        }

    } catch (error) {
        console.log(error);
    }
}

const getAllTasks= async (req, res) => {

    const { username, email } = req.session.user;
    try {
        const student=await userModel.findOne({
            username: username,
            email: email
        });
        if(student){
            try {
                const alltasks=await taskModel.find({
                    receiver: student.group
                });
                if(alltasks){
                    res.render("student/tasks", {
                        username,
                        alltasks
                    });
                }else{
                    console.log('no tasks found')
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            console.log('student not found')
        }
    } catch (error) {
        console.log(error);
    }
}

const showTaskById= async (req, res) => {
    const { username } = req.session.user;
    const id = req.params.id;

    console.log(id + "<-id")
    try {
        
        const submission=await submissionModel.findOne({
            taskId: id
        });
        if(submission !== undefined && submission !== null){
            const task=await taskModel.findOne({
                id: id  
            });
            if(task){
                res.render("student/task", {
                    username,
                    task,
                    submited: true
                });
            }else{
                console.log('no task found');
            }
        }else{
            const task=await taskModel.findOne({
                id: id  
            });
            if(task){
                res.render("student/task", {
                    username,
                    task,
                    submited: true
                });
            }else{
                console.log('no task found');
            }
        }

    } catch (error) {
        console.log(error);
    }

}

const submittask=async (req, res) => {

    const { owner, taskId, taskTitle, comment, ext } = req.body;
    try {
        
        const submission=await submissionModel.create({
            taskTitle,
            comment,
            owner,
            submissionUrl: 'submission_' + owner + taskTitle + "." + ext,
            taskId
        });
        if(submission){
            res.redirect("/home/student");
        }else{
            console.log('task submission failed');
        }

    } catch (error) {
        console.log(error);
    }

}

const getMarks = async (req, res) => {
    const { username, id } = req.session.user;
    try {
        
        const user=await userModel.findOne({
            username:username
        });
        if(user){
            const reportcard=user.reportCard;
            res.render("student/marks", {
                username,
                reportcard
            });
        }else{
            console.log('student not found');
        }


    } catch (error) {
        console.log(error);
    }
}

const getChangePassword=async (req, res) => {
    const { username, email } = req.session.user;
    try {
        const user=await userModel.findOne({username,email});
        if(user){
            res.render('student/password', {
                username,
                password: user.password
            });
        }else{
            console.log('no user found');
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
            res.redirect("/home/student/");
        }
        else{
            console.log('password update failed');
        }

    }
    else{
        res.send("the passwords don't math!")
    }

}

module.exports={getStudentHome,getStudentProfile,getClassroomNotices,viewNoticeById,getAllTasks,showTaskById,submittask,getMarks,getChangePassword,postChangePassword};