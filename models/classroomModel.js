const mongoose=require('mongoose');
const classrooomSchema=mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    slug:{
        type: String,
        required:true
    },
    teacher:{
        type: String,
        required:true
    }
})
const classroomModel=mongoose.model("classrooms", classrooomSchema);
module.exports=classroomModel;