const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')
const Random=require('generate-serial-number')

const entranceExamRegister=require('../../Model/entranceExaminationModels/entranceExamRegister')
const entranceExamRegistrationPD=require('../../Model/entranceExaminationModels/entranceExamRegistrationPD')
const entranceExamFeesPayment=require('../../Model/entranceExaminationModels/entranceExamFeesPayment')
const entranceExamUplaodPhoto = require('../../Model/entranceExaminationModels/entranceExamUplaodPhoto')
const entranceExamFinalSubmit = require('../../Model/entranceExaminationModels/entranceExamFinalSubmit')
const StudentIssuedBookModel=require('../../Model/LMS/studentBookRequestModel')
const async = require('hbs/lib/async')
const fs=require('fs')
const pdf=require('htmltopdf')
const pat=require('path')


const SecurePassword=async(Password)=>{
    try {
        const passwordHash=await bcrypt.hash(Password,10);
        return passwordHash;
    } catch (error) {console.log(error.message);}
    }
const StudentLogin=async(req,res)=>{
    try {
        const CheckEmail=await entranceExamRegister.findOne({Email:req.body.Email})
        if (CheckEmail) {
            if(CheckEmail.Varified===1){
                const ComparePassword=await bcrypt.compare(req.body.Password,CheckEmail.Password)
                 if(ComparePassword){
                       req.session.Student_ID=CheckEmail._id;
                       res.send(CheckEmail.Email)
                 }else{res.send('Your Password is Wrong')}
            }else{res.send('Email is not Varified , Please Varify Your Email')}
        }else{res.send('Email is not Exist , Please Try Again')}
    } catch (error) {console.log(error.message);}
}
const StudentLogout=async(req,res)=>{
    try {
        req.session.destroy() 
        res.send('Student Successfully Logout')
    } catch (error) {console.log(error.message);}
}
const StudentForgetPassword=async(req,res)=>{
    try {
        const Chechmail=await entranceExamRegister.findOne({Email:req.body.Email})
        if(Chechmail){
        const HashPassword=await SecurePassword(req.body.Password)
        let ForgetPassword = {}
        if (req.body.Password){  ForgetPassword.Password = HashPassword}
        if (req.body.Email){  ForgetPassword.VarifiedDate = 0}
        if (req.body.Email){  ForgetPassword.VarifiedTime = 0}
        if (req.body.Email){  ForgetPassword.Varified = 0}
        let UpdateData = await entranceExamRegister.updateOne({ Email:req.body.Email }, { $set: ForgetPassword }, { new: true, lean: true })
         if(UpdateData){res.send('Successfully Update Password')}
        }else{res.send('Email is not exist')}
    } catch (error) {console.log(error.message);}
}
const studentchangeProfile=async(req,res)=>{
    try {
        const Result=await entranceExamUplaodPhoto.findOne({Email:req.body.Email})
        const UploadDate = new Date().toLocaleDateString();
        const UploadTime = new Date().toLocaleTimeString();
        if (Result) {
            let ChangeProfile = {}
            if (req.file.filename){  ChangeProfile.Photo = req.file.filename}
            if (req.file.filename){  ChangeProfile.UploadDate = UploadDate}
            if (req.file.filename){  ChangeProfile.UploadTime = UploadTime}
            let UpdateData = await entranceExamUplaodPhoto.updateOne({ Email:req.body.Email }, { $set: ChangeProfile }, { new: true, lean: true })
             if(UpdateData){res.send('Successfully Update Profile')}
        }
    } catch (error) {console.log(error.message);} 
}
const StudentDashboard=async(req,res)=>{
    try {
        const Result=await entranceExamRegister.findOne({Email:req.query.Email})
        const Result2=await entranceExamUplaodPhoto.findOne({Email:req.query.Email})
        const Result3=await entranceExamRegistrationPD.findOne({Email:req.query.Email})
        const Book=await StudentIssuedBookModel.find({Email:req.query.Email})
        const Payment=await entranceExamFeesPayment.find({Email:req.query.Email})
        if (Result) {
                   res.render('studentDashboard',{Result:Result,Result2:Result2,Result3:Result3,Book:Book,Payment:Payment})
               } 
    } catch (error) {console.log(error.message);}
}
const downloadEntranceExamResult=async(req,res)=>{
      try {
        const Result=await entranceExamRegister.find();
        if(Result){res.send('Suceessfully Download Entrance Exam Result')}
      } catch (error) {
        
      }
}
const downloadExamNotice=async()=>{
     try {
        
     } catch (error) {console.log(error.message);}

}
module.exports={
    StudentLogin,
    StudentLogout,
    StudentForgetPassword,
    studentchangeProfile,
    StudentDashboard,
    downloadEntranceExamResult,
    downloadExamNotice,
}