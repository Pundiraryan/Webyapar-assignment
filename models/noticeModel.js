const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    author: {
        type: String,
        required:true
    },
    title: {
        type: String,
        required:true
    },
    notice: {
        type: String,
        required:true
    },//the receivers is the classroom
    receiver:{
        type: String,
        required:true
    }

})

const noticeModel = mongoose.model("notices", noticeSchema);
module.exports=noticeModel