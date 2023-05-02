const mongoose=require('mongoose')
const Schema=mongoose.Schema({
    RegistrationNO:{
        type:String,
        required:true,
        unique:true,
    },
    Name:{
        type:String,
        required:true,
        uppercase:true,
    },
    FatherName:{
        type:String,
        required:true,
        uppercase:true,
       },
    Email:{
        type:String,
        required:true,
        unique:true,
       },
    Reject_Reason:{
        type:String,
        require:true,
    },
    RejectDate:{
        type:String,
        require:true,
    },
    Reject:{
        type:Number,
        default:0,
    },
})
const entranceExamRejectForm=mongoose.model('entranceExamRejectForm',Schema)
module.exports=entranceExamRejectForm;