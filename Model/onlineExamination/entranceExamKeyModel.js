const mongoose= require("mongoose");

const Schema=mongoose.Schema({
    Name:{
        type:String,
        require:true,
        uppercase:true,
    },
    Condiate_id:{
        type:String,
        require:true,
        unique:true
    },
    RegistrationNO:{
        type:String,
        require:true,
        unique:true
    },
    ExamKey:{
        type:Number,
        require:true,
        unique:true
    },
    Password:{
        type:String,
        require:true,
    },
    Varified:{
        type:Number,
        default:0,
    },
    Login_Date:{
        type:String,
        default:0,
    },
    Login_Time:{
        type:String,
        default:0,
    },
    Login_Varified:{
        type:Number,
        default:0,
    },
})
const entranceExamKeyModel=mongoose.model('entranceExamKeyModel',Schema)
module.exports=entranceExamKeyModel