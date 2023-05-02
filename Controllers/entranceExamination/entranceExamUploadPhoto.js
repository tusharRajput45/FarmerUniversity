const fs=require('fs')
const entranceExamRegister=require('../../Model/entranceExaminationModels/entranceExamRegister')
const entranceExamUplaodPhoto=require('../../Model/entranceExaminationModels/entranceExamUplaodPhoto')
const GetentranceExamUploadPhoto=async(req,res)=>{
    const Result=await entranceExamUplaodPhoto.findOne({Email:req.query.Email})
    if(Result){}else{
      const CheckEmail=await entranceExamRegister.findOne({Email:req.query.Email}) 
      if (CheckEmail) {
        res.render('entranceExamUploadPhoto',{Result:CheckEmail})
      }     }
}
const PostentranceExamUploadPhoto=async(req,res)=>{
    const UploadDate = new Date().toLocaleDateString();
    const UploadTime = new Date().toLocaleTimeString();
    try {
        const Data=new entranceExamUplaodPhoto({
            Email:req.body.Email, 
            Photo:req.file.filename,
            UploadDate,
            UploadTime,
        })
        const SaveData=Data.save();
        if (SaveData) {res.send('')}
    } catch (error) {console.log(error.message);}
}
module.exports={
    GetentranceExamUploadPhoto,
    PostentranceExamUploadPhoto,
}            