const express=require('express')
const admissionRoute=express();
const admission=require('../Controllers/admission/admissionRegistration')

const ejs=require('ejs')
admissionRoute.set('view engine','ejs')
admissionRoute.set('views','./View/admission')

admissionRoute.get('/',(req,res)=>{res.render('admissionLogin')})
admissionRoute.get('/admissionRegistration',(req,res)=>{res.render('admissionRegistration')})
admissionRoute.post('/admissionRegistration',admission.admissionRegistration)
admissionRoute.get('/admissionLogin',admission.admissionLogin)
admissionRoute.post('/admissionPasswordForget',admission.admissionPasswordForget)
admissionRoute.get('/admissionDashboard',admission.admissionDashboard)
admissionRoute.get('/admissionEducationDetails',(req,res)=>{res.render('admissionEducationDetails')})
admissionRoute.get('/admissionAddressDetails',(req,res)=>{res.render('admissionAddressDetails')})
admissionRoute.get('/admissionRegPassModel',admission.admissionRegPassModel)

admissionRoute.post('/EmailMobileSendOTP',admission.EmailMobileSendOTP)








module.exports=admissionRoute;