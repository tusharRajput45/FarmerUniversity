const express=require('express');
const adminRoute=express();

const session=require('express-session')
adminRoute.use(session({secret:process.env.SESSION}))

const ejs=require('ejs'); 
const adminentranceExam = require('../Controllers/admin/adminEntranceExam');
const adminRegister  = require('../Controllers/admin/adminRegister');
const adminEntranceExamVarification = require('../Controllers/admin/adminEntranceExamForm');
const adminLMS=require('../Controllers/admin/adminLMS')


const adminAuth=require('../MiddleWare/adminAuth');
const adminExam  = require('../Controllers/admin/adminAddExam');

adminRoute.set('view engine','ejs')
adminRoute.set('views','./View/admin')



adminRoute.get('/',adminAuth.adminLogout,(req,res)=>{res.render('adminLogin')})
adminRoute.post('/',adminRegister.adminRegisterLogin)
adminRoute.post('/AdminRegister',adminRegister.PostadminRegister)
adminRoute.get('/adminDashboard',adminAuth.adminLogin,adminRegister.adminDashboard)
adminRoute.get('/adminentranceExamRegister',adminAuth.adminLogin,adminentranceExam.adminentranceExamRegister)
adminRoute.get('/adminLogout',adminAuth.adminLogin,adminRegister.adminLogout)
adminRoute.post('/adminentranceExamEditRegister',adminentranceExam.GetadminentranceExamEditRegister)
adminRoute.post('/PostadminentranceExamEditRegister',adminentranceExam.PostadminentranceExamEditRegister)
adminRoute.post('/adminentranceExamDeleteRegister',adminentranceExam.adminentranceExamDeleteRegister)
adminRoute.get('/adminDeleteEntranceExamForm',adminentranceExam.adminDeleteEntranceExamForm)


adminRoute.get('/adminEntranceExamForm',adminEntranceExamVarification.adminEntranceExamForm)
adminRoute.get('/adminEntranceExamFormVarification',adminEntranceExamVarification.adminEntranceExamFormVarification)
adminRoute.post('/adminEntranceExamFormVarification',adminEntranceExamVarification.PostadminEntranceExamFormVarification)
adminRoute.post('/adminEntranceExamFormReject',adminEntranceExamVarification.adminEntranceExamFormReject)

adminRoute.get('/adminEntranceExamPayment',adminEntranceExamVarification.adminEntranceExamPayment)
adminRoute.get('/adminEntranceUploadPhotoVarify',adminEntranceExamVarification.adminEntranceUploadPhotoVarify)
adminRoute.post('/adminGenerateEntranceExamKey',adminEntranceExamVarification.adminGenerateEntranceExamKey)

adminRoute.get('/adminExamination',(req,res)=>{res.render('adminExamination')})
adminRoute.post('/PostAddExam',adminExam.adminAddExam)
adminRoute.post('/PostAddQA',adminExam.adminAddQA)
adminRoute.get('/showAllExam',adminExam.ShowAllExam)
adminRoute.post('/DeleteExam',adminExam.DeleteExam)
adminRoute.get('/EditExam',adminExam.EditExam)
adminRoute.post('/PostEditExam',adminExam.PostEditExam)
adminRoute.get('/ShowAnswer',adminExam.ShowQuestionAnswer)




adminRoute.get('/adminLMS',(req,res)=>{res.render('adminLMS')})
adminRoute.get('/adminLMSStudentRegister',adminLMS.LMSadminRegister)
adminRoute.post('/adminLMSStudentRegisterDelete',adminLMS.LMSadminRegisterDelete)
adminRoute.post('/adminLMSStudentRegisterEdit',adminLMS.LMSadminRegisterEdit)

adminRoute.get('/adminLMSStudentAllBookRequest',adminLMS.adminLMSStudentAllBookRequest)




module.exports=adminRoute