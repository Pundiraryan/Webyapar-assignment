const mongoose=require('mongoose');
const taskSechema= mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    receiver:{
        type:String
    },
    assignment:{
        type:String,
        required:true
    },
    fileUrl:{
            type: String,
    },
    mark:{
        type: String,
        required:true
       },
       deadline:{
        type: String,
        required:true
       },
       teacher:{
        type: String,
        required:true
       }       
})
const taskModel = mongoose.model("tasks", taskSechema);
module.exports=taskModel
