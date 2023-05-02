const entranceExamRegister = require("../../Model/entranceExaminationModels/entranceExamRegister");
const entranceExamRegisterPD = require("../../Model/entranceExaminationModels/entranceExamRegistrationPD");
const entranceExamUploadPhoto=require('../../Model/entranceExaminationModels/entranceExamUplaodPhoto')
const entranceExamFeesPayment=require('../../Model/entranceExaminationModels/entranceExamFeesPayment')
const entranceExamFinalSubmit=require('../../Model/entranceExaminationModels/entranceExamFinalSubmit')

const nodemailer=require('nodemailer')



const adminEntranceExamForm=async(req,res)=>{
   try {
       const Result=await entranceExamFinalSubmit.find({Final_Submit:1})
       res.render('adminEntranceExamForm',{Result:Result})
   } catch (error) {console.log(error.message);}
}
const adminEntranceExamPayment=async(req,res)=>{
    try {
        const Result=await entranceExamFeesPayment.find();
        if(Result){
            res.render('adminEntranceExamPayment',{Result:Result})
        }
    } catch (error) {console.log(error.message);}
}
const adminEntranceUploadPhotoVarify=async(req,res)=>{
    try {
       const Result=await entranceExamUploadPhoto.findOne({_id:req.query._id})
       if(Result){res.send(Result.Photo)}
    } catch (error) {console.log(error.message);}
}
const adminEntranceExamFormVarification=async(req,res)=>{
    try {
       const Result=await entranceExamFinalSubmit.find({Varified_admin:0})
       if (Result) {
          res.render('adminEntranceExamFormVarification',{Result:Result})
       }
    } catch (error) {console.log(error.message);}

}
const PostadminEntranceExamFormVarification=async(req,res)=>{
    const Result=await entranceExamFinalSubmit.findOne({_id:req.query._id})
    const VarifyDate = new Date().toLocaleDateString();
    if (Result) {
        if (Result.Varified_admin===1) {
            res.send('Already Varify')
        } else {
            try {
                let entranceExamFormVarify = {}
                if (Result){   entranceExamFormVarify.Varified_admin = 1}
                if (Result){   entranceExamFormVarify.admin_Varified_Date = VarifyDate}
                let UpdateData = await entranceExamFinalSubmit.updateOne({ _id:req.query._id }, { $set: entranceExamFormVarify }, { new: true, lean: true })  
                if (UpdateData) {res.send('Successfully Varify')} 
               } catch (error) {console.log(error.message);}        
        } 
    }
}
const adminEntranceExamFormReject=async(req,res)=>{
    const Result=await entranceExamFinalSubmit.findOne({_id:req.query._id})
    const RejectDate = new Date().toLocaleDateString();
    if (Result) {
        if (Result.Varified_admin===1) {
            res.send('Already Reject')
        } else {
            // try {
            //     let entranceExamFormVarify = {}
            //     if (Result){   entranceExamFormVarify.Varified_admin = 1}
            //     if (Result){   entranceExamFormVarify.admin_Varified_Date = VarifyDate}
            //     let UpdateData = await entranceExamFinalSubmit.updateOne({ _id:req.query._id }, { $set: entranceExamFormVarify }, { new: true, lean: true })  
            //     if (UpdateData) {res.send('Successfully Varify')} 
            //    } catch (error) {console.log(error.message);}        
        } 
    }
}
const adminGenerateEntranceExamKey=async(req,res)=>{
    try {
         const Result=await entranceExamFinalSubmit.find({Varified_admin:1})
         for(var i=0;i<Result.length;i++){
            let transporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:process.env.EMAIL,
                    pass:process.env.EMAILPASSWORD,
                }
            })
            let info=transporter.sendMail({
                from:process.env.EMAIL,
                to:Result[i].Name,
                subject:"Email Verification",
                text:'Your Email Varification',
                html:'<center>'+
                '<div class="" style="width: 30%; padding: 20px; border-radius: 20px;background-color: bisque;">'+
                    '<h4>Email Varification</h4>'+
                '</div>'+
                '</center>'
            })
            console.log("Send Email");
         }
    } catch (error) {console.log(error.message);}
}
module.exports={
    adminEntranceExamForm,
    adminEntranceExamPayment,
    adminEntranceUploadPhotoVarify,
    adminEntranceExamFormVarification,
    PostadminEntranceExamFormVarification,
    adminEntranceExamFormReject,
    adminGenerateEntranceExamKey
}