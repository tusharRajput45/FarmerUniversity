const express=require('express')
const entranceExaminationRoute=express();
const multer=require('multer')
const path=require('path')
const session=require('express-session')
entranceExaminationRoute.use(session({secret:process.env.SESSION}))

const entranceExamRegister=require('../Controllers/entranceExamination/entranceExamRegister')
const entranceExamUploadPhoto=require('../Controllers/entranceExamination/entranceExamUploadPhoto')
const entranceExamFees=require('../Controllers/entranceExamination/entranceExamFees')
const entranceExam=require('../Controllers/entranceExamination/entranceExam')
const entranceExamQuestionAnswer=require('../Controllers/entranceExamination/entranceExamQ&A')


//MiddleWare

const entranceExamDashboardAuth=require('../MiddleWare/entranceExaminationAuth')


const ejs=require('ejs') 
entranceExaminationRoute.set('view engine','ejs')
entranceExaminationRoute.set('views','./View/entranceExamination')
const storage=multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,path.join(__dirname,"../Public/Image/entranceExamUploadPhoto"));
    },
    filename:function(req,file,cb){
        const name=Date.now()+"-"+file.originalname; 
        cb(null,name)
    }
})
const Upload=multer({storage:storage}); 

const ExcelFileStorage=multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,path.join(__dirname,"../Public/Image/entranceExamQ&AExcelFile"));
    },
    filename:function(req,file,cb){
        const name=Date.now()+"-"+file.originalname; 
        cb(null,name)
    }
})
const ExcelFileUpload=multer({storage:ExcelFileStorage}); 

// entrance Exam Form Route

entranceExaminationRoute.get('/',entranceExamDashboardAuth.entranceExamDashboardisLogout,(req,res)=>{res.render('entranceExamination')})
entranceExaminationRoute.post('/PostentranceExamRegister',entranceExamRegister.PostentranceExamRegister)
entranceExaminationRoute.post('/entranceRegisterForgetPassword',entranceExamRegister.entranceRegisterForgetPassword)

entranceExaminationRoute.get('/entranceExamRegisterEmailVarify',entranceExamRegister.entranceExamRegisterEmailVarify)
entranceExaminationRoute.post('/PostentranceExamRegisterEmailVarify',entranceExamRegister.PostentranceExamRegisterEmailVarify)
entranceExaminationRoute.post('/entranceExamRegisterLogin',entranceExamRegister.entranceExamRegisterLogin)
entranceExaminationRoute.get('/EntranceExamRegistrationPD',entranceExamDashboardAuth.entranceExamDashboardisLogin,entranceExamRegister.GetEntranceExamRegistrationPD)
entranceExaminationRoute.post('/PostEntranceExamRegistrationPD',entranceExamRegister.PostEntranceExamRegistrationPD)
entranceExaminationRoute.get('/entranceExamDashboard',entranceExamDashboardAuth.entranceExamDashboardisLogin,entranceExamRegister.entranceExamDashboard)
entranceExaminationRoute.get('/entranceExamFinalPrint',entranceExamDashboardAuth.entranceExamDashboardisLogin,entranceExamRegister.entranceExamFinalPrint)
entranceExaminationRoute.get('/entranceExamUploadPhoto',entranceExamDashboardAuth.entranceExamDashboardisLogin,entranceExamUploadPhoto.GetentranceExamUploadPhoto)
entranceExaminationRoute.post('/PostentranceExamUploadPhoto',Upload.single('file'),entranceExamUploadPhoto.PostentranceExamUploadPhoto)

entranceExaminationRoute.get('/entranceExamFees',entranceExamDashboardAuth.entranceExamDashboardisLogin,entranceExamFees.entranceExamFees)
entranceExaminationRoute.get('/entranceExamFeesPay',entranceExamDashboardAuth.entranceExamDashboardisLogin,entranceExamFees.entranceExamFeesPay)
entranceExaminationRoute.post('/PostentranceExamFeesPay',entranceExamFees.PostentranceExamFeesPay)
entranceExaminationRoute.get('/entranceExamDashBoardLogout',entranceExamDashboardAuth.entranceExamDashboardisLogin,entranceExamRegister.entranceExamDashBoardLogout)

entranceExaminationRoute.post('/entranceExamFeesPaymentStatus',entranceExamFees.PostentranceExamFeesPaymentStatus)
entranceExaminationRoute.get('/entranceExamFeesPaymentStatus',entranceExamFees.GetentranceExamFeesPaymentStatus)
entranceExaminationRoute.post('/entranceExamPaymentCardDetails',entranceExamFees.entranceExamPaymentCardDetail)


// Entrance Exam Give Route

entranceExaminationRoute.get('/entranceExamLogin',(req,res)=>{res.render('entranceExamLogin')})
entranceExaminationRoute.post('/entranceExamLogin',entranceExam.entranceExamLogin)
entranceExaminationRoute.get('/entranceExam',(req,res)=>{res.render('entranceExam')})
entranceExaminationRoute.get('/entranceExamQ&A',(req,res)=>{res.render('entranceExamQ&A')})
entranceExaminationRoute.post('/entranceExamQ&A',ExcelFileUpload.single('file'),entranceExamQuestionAnswer.entranceExamExportQuestionAnswer)



 

entranceExaminationRoute.get('/entranceExamLoginPage',(req,res)=>{res.render('entranceExamLoginPage')})
entranceExaminationRoute.post('/entranceExamLoginPage',(req,res)=>{res.render('entranceExamLoginPage')})







module.exports=entranceExaminationRoute;