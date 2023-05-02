const express=require('express')
const studentRoute=express();
const multer=require('multer')
const path=require('path')


const session=require('express-session')
studentRoute.use(session({secret:process.env.SESSION}))

const StudentAuth=require('../MiddleWare/studentAuth');

const ejs=require('ejs')
studentRoute.set('view engine','ejs')
studentRoute.set('views','./View/studentCorner')

const Student=require('../Controllers/studentCorner/student')

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

studentRoute.get('/',StudentAuth.StudentLogout,(req,res)=>{res.render('StudentLogin')})
studentRoute.post('/',Student.StudentLogin)
studentRoute.get('/StudentLogout',StudentAuth.StudentLogin,Student.StudentLogout)
studentRoute.post('/StudentForgetPassword',Student.StudentForgetPassword)
studentRoute.post('/studentchangeProfile',Upload.single('file'),Student.studentchangeProfile)
studentRoute.get('/StudentDashboard',StudentAuth.StudentLogin,Student.StudentDashboard)
studentRoute.post('/downloadEntranceExamResult',Student.downloadEntranceExamResult)
studentRoute.post('/downloadExamNotice',Student.downloadExamNotice)









module.exports=studentRoute;