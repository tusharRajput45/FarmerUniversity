const express=require('express')
const onlineExaminationRoute=express();
const multer=require('multer')
const path=require('path')
const session=require('express-session')
onlineExaminationRoute.use(session({secret:process.env.SESSION}))
const ejs=require('ejs') 
onlineExaminationRoute.set('view engine','ejs')
onlineExaminationRoute.set('views','./View/onlineExamination')


const entranceExam=require('../Controllers/OnlineExamination/entranceExam')


onlineExaminationRoute.get('/',(req,res)=>{res.render('entranceExamLoginPage')})
onlineExaminationRoute.post('/ExamLoginPage',entranceExam.entranceExamLogin)
onlineExaminationRoute.post('/Exam') 




 
onlineExaminationRoute.get('/result',(req,res)=>{res.render('Result')})
onlineExaminationRoute.post('/CollegeResult',)
onlineExaminationRoute.post('/EntranceResult',)
onlineExaminationRoute.get('/Exam',entranceExam.entranceExam)
onlineExaminationRoute.get('/ExamKeyExport',entranceExam.entranceExaminationExamKeyExports)



 



module.exports=onlineExaminationRoute;