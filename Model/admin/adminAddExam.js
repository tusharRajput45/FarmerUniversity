const { default: mongoose } = require("mongoose");

const Schema=mongoose.Schema({
    ExamName: {
        type:String,
        require:true,
        uppercase:true,
        unique:true,
    },
    ExamID: {
        type:Number,
        require:true,
        unique:true
    },
    ExamType: {
        type:String,
        require:true,
    },
    ExamDate: {
        type:String,
        require:true,
    },
    ExamStartTime: {
        type:Array,
        require:true,
    },
    ExamTime:{
        type:Array,
        require:true,
    },
    ExamQuestionNO: {
        type:Number,
        require:true,
    },
    ExamSubject: {
        type:Array,
        require:true,
        uppercase:true
    },
    RegisterDate:{
        type:String,
        require:true,
    },
    RegisterTime: {
        type:String,
        require:true,
    },
    Varified:{
        type:Number,
        default:0,
    }
})
const Exam=mongoose.model('Exam',Schema)
module.exports=Exam