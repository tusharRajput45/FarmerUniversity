const express=require('express')
const LMSRoute=express();

const session=require('express-session')
LMSRoute.use(session({secret:process.env.SESSION}))
 
const  LMSAuth  = require('../MiddleWare/LMSAuth');               // MiddleWare Require LMS Student Auth
const  LMSAdminAuth=require('../MiddleWare/LMSAdminAuth')         // MiddleWare Require LMS Admin Auth 

const ejs=require('ejs');
const LMSStudentRegisterLogin = require('../Controllers/LMS/LMSStudentRegister&Login');
const LMSStudentBookRequest = require('../Controllers/LMS/studentBookRequest');
const LMSAdmin=require('../Controllers/LMS/LMSAdmin')
 
LMSRoute.set('view engine','ejs')
LMSRoute.set('views','./View/LMS')


LMSRoute.get('/',LMSAuth.LMSLogout,(req,res)=>{res.render('LMS')})
LMSRoute.get('/LMSAdminRegister',(req,res)=>{res.render('LMSAdminRegister')})

LMSRoute.post('/LMSAdminRegister',LMSAdmin.adminRegister)
LMSRoute.post('/LMSAdminLogin',LMSAdmin.adminLogin)
LMSRoute.get('/LMSAdminDashboard',LMSAdminAuth.LMSAdminLogin,LMSAdmin.AdminDashboard)
LMSRoute.get('/LMSAdminDashboardLogout',LMSAdminAuth.LMSAdminLogin,LMSAdmin.AdminDashboardLogout)
LMSRoute.post('/LMSAdminViewDetails',LMSAdmin.AdminViewDetails)
LMSRoute.post('/LMSStudentRequestBookNO',LMSAdmin.AdminStudentRequestBookNO)
LMSRoute.post('/LMSAdminStudentRequestDelete',LMSAdmin.AdminStudentRequestDelete)
LMSRoute.get('/LMSAdminComfirmRequest',LMSAdminAuth.LMSAdminLogin,LMSAdmin.AdminComfirmRequest)
LMSRoute.post('/LMSAdminReasonRequest',LMSAdmin.LMSAdminRejectRequestReason)
LMSRoute.post('/LMSAdminComfirmRequestSendOTP',LMSAdmin.AdminComfirmRequestSendOTP)
LMSRoute.post('/LMSIssueBookVarifyOTP',LMSAdmin.VarifyOTP)
LMSRoute.get('/IssueBook',LMSAdminAuth.LMSAdminLogin,LMSAdmin.IssueBook)
LMSRoute.get('/LMSRegisterStudent',LMSAdminAuth.LMSAdminLogin,LMSAdmin.LMSRegisterStudent)
LMSRoute.get('/StudentIssuedBook',LMSAdminAuth.LMSAdminLogin,LMSAdmin.StudentIssuedBook)
LMSRoute.get('/LMSAdminViewStudent',LMSAdminAuth.LMSAdminLogin,LMSAdmin.LMSAdminViewStudent)
LMSRoute.get('/LMSAdminStudentDelete',LMSAdminAuth.LMSAdminLogin,LMSAdmin.LMSAdminStudentDelete)
LMSRoute.get('/LMSRejectRequest',LMSAdminAuth.LMSAdminLogin,LMSAdmin.LMSRejectRequest)
LMSRoute.post('/LMSRejectRequestDetails',LMSAdmin.LMSRejectRequestDetails)
LMSRoute.get('/LMSAllBook',LMSAdminAuth.LMSAdminLogin,LMSAdmin.LMSAllBook)
LMSRoute.post('/LMSGetBook',LMSAdmin.LMSGetBook)
LMSRoute.post('/LMSAddBook',LMSAdmin.LMSAddBook)
LMSRoute.post('/LMSEditBook',LMSAdmin.LMSEditBook)
LMSRoute.post('/LMSDeleteBook',LMSAdmin.LMSDeleteBook)



















LMSRoute.get('/LMSStudentDashboard',LMSAuth.LMSLogin,LMSStudentRegisterLogin.StudentDashboard)
LMSRoute.get('/LMSStudentDashboardLogout',LMSAuth.LMSLogin,LMSStudentRegisterLogin.StudentLogout)
LMSRoute.post('/LMSStudentRegister',LMSStudentRegisterLogin.StudentRegister)
LMSRoute.post('/LMSLoginEmailVarify',LMSStudentRegisterLogin.LMSLoginEmailVarify)
LMSRoute.get('/LMSLoginEmailVarified',LMSAuth.LMSLogout,LMSStudentRegisterLogin.LMSLoginEmailVarified)
LMSRoute.post('/LMSStudentLogin',LMSStudentRegisterLogin.StudentLogin)
LMSRoute.post('/LMSStudentBookRequest',LMSStudentBookRequest.StudentBookRequest)
LMSRoute.get('/LMSGetStudentBookRequestEdit',LMSAuth.LMSLogin,LMSStudentBookRequest.GetStudentBookRequestEdit)
LMSRoute.post('/LMSPostStudentBookRequestEdit',LMSStudentBookRequest.PostStudentBookRequestEdit)
LMSRoute.get('/LMSGetStudentBookRequestStatus',LMSAuth.LMSLogin,LMSStudentBookRequest.GetStudentBookRequestStatus)
LMSRoute.get('/LMSStudentBookRequestDelete',LMSAuth.LMSLogin,LMSStudentBookRequest.StudentBookRequestDelete)






module.exports=LMSRoute;