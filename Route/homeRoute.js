const express=require('express')
const homeRoute=express();

const ejs=require('ejs')
homeRoute.set('view engine','ejs')
homeRoute.set('views','./View/home')

homeRoute.get('/',(req,res)=>{res.render('Home')})
homeRoute.get('/News',(req,res)=>{res.render('News')})
homeRoute.get('/Doc',(req,res)=>{res.render('Doc')})



module.exports=homeRoute;