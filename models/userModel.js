const mongoose =require('mongoose');

const userShema = mongoose.Schema({
    profilePictureUrl:{
                type: String,
            },
            username: {
                type: String,
                required:true
            },
            name: {
                type: String,
                required:true
            },
            lastName: {
                type: String,
                required:true
            },
            email: {
                type: String,
                required:true
                // primaryKey: true
            },
            password: {
                type: String,
                required:true
            },
            
            accountType:{
                type: String,
                required:true
            },
            group:{//this is classroom
                type: String,
                required:true,
                default:""
            },
            reportCard:{
                n1:{
                    type:Number,
                    defaultValue: 0
                },
                n2:{
                    type:Number,
                    defaultValue: 0
                },
                n3:{
                    type:Number,
                    defaultValue: 0
                },
                average:{
                    type: Number,
                    defaultValue: 0
                }
            }
        });
        const userModel = mongoose.model("users", userShema);
        module.exports=userModel;
