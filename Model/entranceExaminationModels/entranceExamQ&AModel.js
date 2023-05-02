const mongoose=require('mongoose')
const Schema=mongoose.Schema({
    QuestionNO:{
        type:Number,
        default:0,
    },
    Question:{
        type:String,
    },
    Answer:{
        type:Array,
    },
    TrueAnswer:{
        type:String,
    },
    ExamCode:{
        type:Number,
        default:0,
    },
    Varified:{
        type:Number,
        default:0,
    },

})
const entranceexamquestionanswers=mongoose.model('entranceexamquestionanswers',Schema)
module.exports=entranceexamquestionanswers; 