const express=require('express');
const app=express();

//Body Parser

const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Server Port..

const dotenv=require('dotenv')
const Env=dotenv.config({path:__dirname+'/Config/.env'})
const PORT=process.env.PORT||5000;    

//Database ....

const DataBase=require('./Config/DataBase');

app.use(express.static(__dirname+'/Public/Image'))        
app.use(express.static(__dirname+'/Public/Style'))       
app.use(express.static(__dirname+'/Public/JS')) 

//Router Imports

const homeRoute=require('./Route/homeRoute')
const entranceExaminationRoute=require('./Route/entranceExaminationRoute')
const adminRoute=require('./Route/adminRoute')
const LMSRoute=require('./Route/LMSRoute')
const admissionRoute=require('./Route/admissionRoute')
const onlineExaminationRoute=require('./Route/onlineExaminationRoute')
const studentRoute=require('./Route/studentRoute')








// Routing ...

app.use('/',homeRoute)
app.use('/entranceExamination',entranceExaminationRoute)
app.use('/admin',adminRoute)
app.use('/LMS',LMSRoute)
app.use('/admission',admissionRoute)
app.use('/onlineExamination',onlineExaminationRoute)
app.use('/Student',studentRoute)








app.listen(PORT,()=>{
   console.log(`RUNNING SERVER PORT NO ${PORT}`);
})

//RUNNING SERVER PORT NO 3000       