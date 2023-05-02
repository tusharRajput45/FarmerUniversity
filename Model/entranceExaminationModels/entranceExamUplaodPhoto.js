const { default: mongoose } = require("mongoose");

const Schema=mongoose.Schema({
    Email:{
        type:String,
        require:true,
        unique:true,
    },
    Photo:{
         type:String,
         require:true,
    },
    UploadDate:{
        type:String,
        require:true,
    },
    UploadTime:{
        type:String,
        require:true,
    },
    Varified:{
        type:Number,
        default:0,
    },
})
const entranceExamUplaodPhoto=mongoose.model('entranceExamUplaodPhoto',Schema)
module.exports=entranceExamUplaodPhoto