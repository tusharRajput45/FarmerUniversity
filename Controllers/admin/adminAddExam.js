const Exam = require("../../Model/admin/adminAddExam")
// const QuestionAnswer=require('../../Model/admin/adminAddQ&A')
const QuestionAnswer=require('../../Model/entranceExaminationModels/entranceExamQ&AModel')
const Random=require('generate-serial-number')



const adminAddExam=async(req,res)=>{
    try {
        const RegisterDate = new Date().toLocaleDateString();
        const RegisterTime = new Date().toLocaleTimeString();
        const Result=await Exam.findOne({ExamName:req.body.ExamName})
        const ExamID=Random.generate(5)
        if(Result){res.send('Exam Already Register')}
        else{
            const Data=new Exam({
                ExamID,
                ExamName:req.body.ExamName,
                ExamType:req.body.ExamType,
                ExamDate:req.body.ExamDate,
                ExamStartTime:req.body.ExamStartTime,
                ExamTime:req.body.ExamTime,
                ExamQuestionNO:req.body.ExamQuestion,
                ExamSubject:req.body.ExamSubject,
                RegisterDate,
                RegisterTime,
            })
            const SaveData=Data.save();
            if(SaveData){res.send('Successfully Add Exam')}
            else{res.send('API Error')}
        }
    } catch (error) {console.log(error.message);}
}
const ShowAllExam=async(req,res)=>{
    try {
        const Result=await Exam.find();
        if(Result){res.render('adminShowAllExam',{Result:Result})}
    } catch (error) {console.log(error.message);}
}
const DeleteExam=async(req,res)=>{
    console.log(req.body);
    try {
        const Result=await Exam.deleteOne({_id:req.body._id})
        if(Result){res.send('Successfully Delete Exam')}
    } catch (error) {console.log(error.message);}
}
const EditExam=async (req,res)=>{
    try {
        const Result=await Exam.findOne({_id:req.query._id})
        if(Result){res.send(Result)}
    } catch (error) {console.log(error.message);}
}
const PostEditExam=async(req,res)=>{
    console.log(req.body);
    try {
        const Result=await Exam.findOne({ExamID:req.body.ExamID})
        if(Result){
            let EditExam = {}
            if (req.body.ExamName){   EditExam.ExamName = req.body.ExamName}
            if (req.body.ExamType){  EditExam.ExamType = req.body.ExamType}
            if (req.body.ExamDate){  EditExam.ExamDate = req.body.ExamDate}
            if (req.body.ExamStartTime){  EditExam.ExamStartTime = req.body.ExamStartTime}
            if (req.body.ExamTime){  EditExam.ExamTime = req.body.ExamTime}
            if (req.body.ExamQuestionNO){  EditExam.ExamQuestionNO = req.body.ExamQuestionNO}
            if (req.body.ExamSubject){  EditExam.ExamSubject = req.body.ExamSubject}
            if (req.body.RegisterDate){  EditExam.RegisterDate = req.body.RegisterDate}
            if (req.body.RegisterTime){  EditExam.RegisterTime = req.body.RegisterTime}
            if (req.body.Varified){  EditExam.Varified = req.body.Varified}
            let UpdateData = await Exam.updateOne({ExamID:Result.ExamID }, { $set: EditExam }, { new: true, lean: true })        
            if(UpdateData){res.send('Update Successfully')}
        }
    } catch (error) {console.log(error.message);}
}
const adminAddQA=async(req,res)=>{
     try {
        const Data=new QuestionAnswer({
            ExamID:req.body.ExamID,
            Question:req.body.Question,
            Answer:req.body.Answer,
            TrueAnswer:req.body.TrueAnswer,
            Question_Varified:1,
        })
        const SaveData=Data.save();
        if (SaveData) {
            res.send('Successfully Save Question & Answer')
        }
     } catch (error) {console.log(error.message);}
}
const ShowQuestionAnswer=async(req,res)=>{
     try {
        const Data=await QuestionAnswer.find({Varified:1})
        res.render('ShowQuestionAnswer',{Result:Data})
     } catch (error) {console.log(error.message);}
}
module.exports={
    adminAddExam,
    ShowAllExam,
    DeleteExam,
    EditExam,
    PostEditExam,
    adminAddQA,
    ShowQuestionAnswer,
}