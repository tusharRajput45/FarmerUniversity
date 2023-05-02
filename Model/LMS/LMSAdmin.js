const { default: mongoose } = require("mongoose");

const Schema=mongoose.Schema({
        Name:{
            type:String,
            required:true,
            uppercase:true,
        },
        Email:{
            type:String,
            required:true,
            unique:true,
        },
        Mobile:{
            type:Number,
            required:true,
            unique:true,
        },
        AdminID:{
            type:String,
            required:true,
            unique:true,
        },
        Password:{
            type:String,
            required:true,
        },
        RegisterDate:{
            type:String,
            default:0,
        },
        RegisterTime:{
            type:String,
            default:0,
        },
        AdminVarified:{
            type:Number,
            default:0,
        },
        AdminLogin:{
            type:Number,
            default:0,
        },
})
const LMSAdminRegisterModel=mongoose.model('LMSAdminRegister',Schema)
module.exports=LMSAdminRegisterModel