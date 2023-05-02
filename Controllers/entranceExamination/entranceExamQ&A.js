const csv=require('csvtojson')
const EntranceExamQuestionAnswerModel=require('../../Model/entranceExaminationModels/entranceExamQ&AModel')
const { response } = require('../../Route/entranceExaminationRoute')
const entranceExamQuestionAnswer=async(req,res)=>{
    try {
        var ExcelData=[];
        csv()
        .fromFile(req.file.path)
        .then(async(response)=>{
            console.log(response);
             for (let x = 0; x < response.length; x++) {
                  ExcelData.push({
                     QuestionNO:response[x].QuestionNO,
                     Question:response[x].Question,
                     Answer:response[x].Answer1,
                     Answer:response[x].Answer2,
                     Answer:response[x].Answer3,
                     Answer:response[x].Answer4,
                     TrueAnswer:response[x].TrueAnswer,
                  });
             } 
             const Data=await EntranceExamQuestionAnswerModel.insertMany(ExcelData)
             if (Data) {
                 res.send()
             }
        })
    } catch (error) {console.log(error.message);}
} 
const entranceExamExportQuestionAnswer=async(req,res)=>{
    try {
        const QuestionNO=(await EntranceExamQuestionAnswerModel.find()).length + 1;
        const Data=new EntranceExamQuestionAnswerModel({
               QuestionNO,
               Question:req.body.Question,
               Answer:req.body.Answer,
               TrueAnswer:req.body.TrueAnswer,
               ExamCode:req.body.ExamCode,
               Varified:1,
        })
        const SaveData=Data.save()
        if(SaveData){res.send('Successfully Save')}
    } catch (error) {console.log(error.message);}
}
module.exports={
    entranceExamExportQuestionAnswer,
}