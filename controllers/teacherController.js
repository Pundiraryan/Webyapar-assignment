const bcrypt = require('bcrypt');
const classroomModel=require('../models/classroomModel');
const userModel=require('../models/userModel');
const noticeModel=require('../models/noticeModel');
const taskModel=require('../models/taskModel');
const submissionModel=require('../models/submisssionModel');
const slugify=require('slugify');

const getHome=(req, res) => {
    res.render("teacher/index", {
        username: req.session.user.username

    })
}

const writeNotice = async (req, res) => {
    const user = req.session.user;
    try {
        const classrooms=await classroomModel.find({
            teacher: user.username
        });
        if(classrooms){
            res.render("teacher/writeNotice", {
                username: req.session.user.username,
                classrooms: classrooms
            })
        }else{
            console.log('no classrooms found');
        }
    } catch (error) {
        console.log(error);
    }
}

const saveNotice = async (req, res) => {

    const { title, notice, receiver } = req.body;
    const { email } = req.session.user;
    try {
        const user=await userModel.findOne({
            email:email
        });
        if(user){
            const notice=await noticeModel.create({
                author: user.username,
                title: title,
                notice: notice,
                receiver: receiver,
                userId: user.id
            });
            if(notice){
                res.redirect("/home/teacher");
            }else{
                console.log('no notice found');
            }
        }else{
            console.log('no user found');
        }
    } catch (error) {
        console.log(error);
    }
    
}

const submitTask= async (req, res) => {

    const { title, formFile, mark, receiver, ext, deadline } = req.body;
    const { email } = req.session.user;
    let url = 'empty';

    console.log(ext + "<")
    if (ext !== 'empty') {

        url = `task_${slugify(title)}_.${ext}`;
    }

    try {
        const user=await userModel.findOne({email:email});
        if(user){
            const result=taskModel.create({
                title: title,
                receiver: receiver,
                assignment: formFile,
                fileUrl: url,
                mark: mark,
                deadline: deadline,
                teacher: user.username
            });
            if(result){
                res.redirect("/home/teacher")
            }else{
                console.log('no result found');
            }
        }else{
            console.log('task submission failed');
        }
    } catch (error) {
        console.log(error);
    }

}

const getNewtasks=async (req, res) => {
    const { username } = req.session.user;
    console.log(req.session.user);
    try {
        const classrooms=await classroomModel.find({
            teacher: username
        });
        console.log(classrooms);
        if(classrooms){
            res.render("teacher/newtask", {
                username: req.session.user.username,
                classrooms: classrooms,
        
            });
        }else{
            console.log('no classrooms found');
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllTasks=async (req, res) => {
    const user = req.session.user;
    try {
        const tasks=await taskModel.find({
            teacher: user.username
        });
        if(tasks){
            res.render("teacher/tasks", {
                username: user.username,
                tasks: tasks
            })
        }else{
            console.log('no tasks found');
        }
    } catch (error) {
        console.log(error);
    }
}

const findTaskById=async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    try {
        const task=await taskModel.findOne({id});
        if(task){
            const submissions=await submissionModel.find({
                taskTitle: task.title
            });
            if(submissions){
                res.render("teacher/task", {
                    username: user.username,
                    task,
                    submissions
                });
            }else{
                console.log('no submission found')
            }
            
        }else{
            console.log('no task with this id exists');
        }
    } catch (error) {
        console.log(error);
    }
}

const getProfile=(req, res) => {

    const user = req.session.user;
    res.render("teacher/profile", {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture
    })
}

const getAllClassrooms= async (req, res) => {
    const { username } = req.session.user;
    try {
        const classrooms=await classroomModel.find({teacher: username});
        if(classrooms){
            res.render('teacher/classrooms', {
                username,
                classrooms
            })
        }else{
            console.log('no classroom exists');
        }
    } catch (error) {
        console.log(error);
    }
}

const getAllClassroomById=async (req, res) => {
    const { username } = req.session.user;
    const id = req.params.id;
    try {
        const classroom=await classroomModel.findOne({id});
        if(classroom){
            const students=await userModel.find({group: classroom.title});
            if(students){
                res.render("teacher/classroom", {
                    username,
                    classroom,
                    students
                })
            }else{
                console.log('no students');
            }
        }else{
            console.log('no classroom with this id');
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
            res.render('teacher/password', {
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
            res.redirect("/home/teacher/");
        }
        else{
            console.log('password update failed');
        }

    }
    else{
        res.send("the passwords don't math!")
    }

}

module.exports={getHome,writeNotice,saveNotice,submitTask,getNewtasks,getAllTasks,findTaskById,getProfile,getAllClassrooms,getAllClassroomById,getChangePassword,postChangePassword}

