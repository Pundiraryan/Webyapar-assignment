const mongoose=require('mongoose');

const submissionSchema=mongoose.Schema({
    assignmentTitle:{
        type:String,
        required:true
   },
   comment:{
    type:String,
        required:true
   },
    owner: {
        type:String,
        required:true
    },
    submissionUrl: {
       type:String,
       required:true
    },
    markObtained:{
        type: Number,
        defaultValue: 0
    },
    assignmentId:{
        type:String,
        required:true
    }
});
const submissionModel = mongoose.model("submissions", submissionSchema);
module.exports=submissionModel