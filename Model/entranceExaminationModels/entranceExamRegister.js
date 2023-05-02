const mongoose=require('mongoose')
const Schema=mongoose.Schema({
    Name:{
        type:String,
        uppercase:true,
        require:true,
    },
    Email:{
        type:String,
        require:true,
        unique:true,
    },
    Mobile:{
        type:Number,
        require:true,
        unique:true,
    },
    Password:{
        type:String,
        require:true,
    },
    RegisterDate:{
        type:String,
        require:true,
    },
    RegisterTime:{
        type:String,
        require:true,
    },
    VarifiedDate:{
        type:String,
        default:0,
    },
    VarifiedTime:{
        type:String,
        default:0,
    },
    Varified:{
        type:Number,
        default:0,
    },

})
const entranceExamRegister=mongoose.model('entranceExamRegister',Schema)
module.exports=entranceExamRegister; 