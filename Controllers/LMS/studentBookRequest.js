const LMSStudentRegisterModel=require('../../Model/LMS/LMSStudentRegisterModel')
const LMSStudentBookRequestModel=require('../../Model/LMS/studentBookRequestModel')

const Random=require('generate-serial-number')


const StudentBookRequest=async(req,res)=>{
    try {
        const CheckEmail=await LMSStudentRegisterModel.findOne({Email:req.body.Email})
        const RequestNO=Random.generate(10)
        const RequestDate = new Date().toLocaleDateString();
        const RequestTime = new Date().toLocaleTimeString();
        if (CheckEmail) {
            const Data=new LMSStudentBookRequestModel({
                RequestNO,
                Name:CheckEmail.Name,
                Email:CheckEmail.Email,
                CollegeID:CheckEmail.CollegeID,
                BookName:req.body.BookName,
                BookAuthorName:req.body.BookAuthorName,
                SubmitDate:req.body.SubmitDate,
                RequestDate,
                RequestTime,
            })
            const SaveData=Data.save();
            if(SaveData){res.send('Request Save Successfully')}
        } else {res.send('College ID is not Match')}
    } catch (error) {console.log(error.message);}
}
const GetStudentBookRequestEdit=async(req,res)=>{
    try {
        const Result=await LMSStudentBookRequestModel.findOne({_id:req.query._id})
        if (Result) {res.send(Result)}
    } catch (error) {console.log(error.message);}
}
const PostStudentBookRequestEdit=async(req,res)=>{
      try {
        const Result=await LMSStudentBookRequestModel.findOne({RequestNO:req.body.RequestNO})
        if (Result.Status==='Pending') {
            let EditRequest = {}
            if (req.body.BookName){  EditRequest.BookName = req.body.BookName}
            if (req.body.BookAuthorName){  EditRequest.BookAuthorName = req.body.BookAuthorName}
            if (req.body.SubmitDate){  EditRequest.SubmitDate = req.body.SubmitDate}
            let UpdateData = await LMSStudentBookRequestModel.updateOne({ RequestNO:req.body.RequestNO }, { $set: EditRequest }, { new: true, lean: true })
            if (UpdateData) {res.send('Request Update Successfully')}
            else {res.send('DataBase Error')}
         } else if(Result.Status==='Comfirm'){res.send('Your Request Already Comfirm , You are not Update Request ')} 
         else if(Result.Status==='Reject'){res.send('Your Request Already Reject , You are not Update Request ')}   
      } catch (error) {console.log(error.message);}
}
const GetStudentBookRequestStatus=async(req,res)=>{
    try {
        const Result=await LMSStudentBookRequestModel.findOne({_id:req.query._id})
        if (Result) {res.send(Result)}
    } catch (error) {console.log(error.message);}
}
const StudentBookRequestDelete=async(req,res)=>{
    console.log(req.query._id);
    try {
        const Result=await LMSStudentBookRequestModel.deleteOne({_id:req.query._id})
        if (Result) {res.send('Request Delete Successfully')}
        else{res.send('DataBase Error')}
    } catch (error) {console.log(error.message);}
}
module.exports={
    StudentBookRequest,
    GetStudentBookRequestEdit,
    PostStudentBookRequestEdit,
    GetStudentBookRequestStatus,
    StudentBookRequestDelete,
}