const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    ExamID:{
        type:Object,
        require:true,
    },
    Question:{
        type:String,
        require:true,
        unique:true,
    },
    Answer:{
        type:Array,
        require:true,
    },
    TrueAnswer:{
        type:String,
        reqiure:true,
    },
    Question_Varified:{ 
        type:Number,
        default:0,
    }
})
const QuestionAnswer=mongoose.model('QuestionAnswer',Schema)
module.exports=QuestionAnswer;