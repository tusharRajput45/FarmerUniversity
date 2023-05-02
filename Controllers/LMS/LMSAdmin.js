const LMSAdminRegisterModel = require("../../Model/LMS/LMSAdmin");
const StudentBookRequestModel = require("../../Model/LMS/studentBookRequestModel");
const LMSStudentRegisterModel=require('../../Model/LMS/LMSStudentRegisterModel')
const LMSAllBookModel=require('../../Model/LMS/LMSAllBook')

const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')
const Random=require('generate-serial-number')


const SecurePassword=async(Password)=>{
   try {
       const passwordHash=await bcrypt.hash(Password,10);
       return passwordHash;
   } catch (error) {console.log(error.message);}
   }

const adminRegister=async(req,res)=>{
     try {
            const RegisterDate = new Date().toLocaleDateString();
            const RegisterTime = new Date().toLocaleTimeString();
            const Password=await SecurePassword(req.body.Password)
         const Data=new LMSAdminRegisterModel({
            Name:req.body.Name,
            Email:req.body.Email,
            Mobile:req.body.Mobile,
            AdminID:req.body.AdminID, 
            Password,
            RegisterDate,
            RegisterTime, 
         })
         const SaveData=Data.save();
         if (SaveData) {res.send("Successfully Save")}
          else {res.send('DataBase Error')}
     } catch (error) {console.log(error.message);}
}

const adminLogin=async(req,res)=>{
     try {
        const CheckMail=await LMSAdminRegisterModel.findOne({Email:req.body.Email})
        if (CheckMail) {
           if (CheckMail.AdminVarified===1) {
                const PasswordMatch=await bcrypt.compare(req.body.Password,CheckMail.Password)
                if (PasswordMatch) {
                   req.session.Admin_ID=CheckMail._id; 
                   res.send(CheckMail.Email) 
                } else {res.send('Password is incorrect')}
           } else {res.send('Email is not Varify')}
        } else {res.send('Email is not Exist')}
      } catch (error) {console.log(error.message);}
}
const AdminDashboard=async(req,res)=>{
   try {
      const Result=await StudentBookRequestModel.find({BookIssueBookNO:0})
      if (Result) {res.render('LMSAdminDashboard',{Result:Result})}
   } catch (error) {console.log(error.message);}
}
const AdminDashboardLogout=async(req,res)=>{ 
     try {
          req.session.destroy();
          res.send('Successfully Logout Admin') 
     } catch (error) {console.log(error.message);}
}
const AdminViewDetails=async(req,res)=>{ 
    try {
        const Result=await StudentBookRequestModel.findOne({_id:req.body._id})
        if (Result) {res.send(Result)}
    } catch (error) {console.log(error.message);}
}
const AdminStudentRequestBookNO=async(req,res)=>{
        try {
          const Result=await StudentBookRequestModel.findOne({_id:req.body._id})
          const Book=await LMSAllBookModel.findOne({BookNO:req.body.BookIssueBookNO})
          const RequestBook=await StudentBookRequestModel.findOne({BookIssueBookNO:req.body.BookIssueBookNO})
          if (Result.BookIssueBookNO===0) {
            const BookNOIssueDate = new Date().toLocaleDateString();
            if (Book.Varified===1) {
              if (RequestBook) {
                 res.send('This Book No is already Issued')
              }else if(Result.BookName===Book.BookName){
                let BookNoUpdate = {}
                if (req.body.BookIssueBookNO){  BookNoUpdate.BookIssueBookNO = req.body.BookIssueBookNO}
                if (req.body.BookIssueBookNO){  BookNoUpdate.Status = 'Comfirm'}
                if (req.body.BookIssueBookNO){  BookNoUpdate.RequestStatus = 'Your Request is Comfirm'}
                if (BookNOIssueDate){  BookNoUpdate.BookNOIssueDate = BookNOIssueDate}
                let UpdateData = await StudentBookRequestModel.updateOne({ _id:req.body._id }, { $set: BookNoUpdate }, { new: true, lean: true })
                      if (UpdateData) {res.send('Successfully Book NO Save')}
                          else {console.log('DataBase Error');}
              }else{res.send('Book Name Is not Matched')}
            }else{res.send('BookNo is not Matched')}
          } else {res.send('Book NO Already Save');}
        } catch (error) {console.log(error.message);} 
}
const AdminStudentRequestDelete=async(req,res)=>{
        try {
             const Result=await StudentBookRequestModel.deleteOne({_id:req.body._id})
             if (Result) {res.send('Successfully Delete Request')}
             else{console.log('DataBase Error');}
        } catch (error) {console.log(error.message);}
}
const AdminComfirmRequest=async(req,res)=>{
    try {
      const Result=await StudentBookRequestModel.find({BookIssueOTPSend:0})
      if (Result) {res.render('LMSAdminComfirmRequest',{Result:Result})}
    } catch (error) {console.log(error.message);}
}
const LMSAdminRejectRequestReason=async(req,res)=>{
   console.log(req.body);
  try {
    const Result=await StudentBookRequestModel.findOne({_id:req.body._id})
    const RejectDate = new Date().toLocaleDateString();
    if (Result) {
                let RejectRequestReason = {}
                        if (req.body.CancelReason){  RejectRequestReason.BookRejectReason = req.body.CancelReason}
                        if (req.body.CancelReason){  RejectRequestReason.Status = 'Reject'}
                        if (req.body.CancelReason){  RejectRequestReason.RequestStatus = 'Your Request is Reject'}
                        if (req.body.CancelReason){  RejectRequestReason.BookRejectDate = RejectDate}
                        let UpdateData = await StudentBookRequestModel.updateOne({ _id:req.body._id }, { $set: RejectRequestReason }, { new: true, lean: true })
                           if (UpdateData) {res.send('Successfully Reject Request')} 
                } 
  } catch (error) {console.log(error.message);}
}
const AdminComfirmRequestSendOTP=async(req,res)=>{
    try {
      const Result=await StudentBookRequestModel.findOne({_id:req.body._id})
      if (Result.BookIssueOTPSend===1) {res.send('Already Send OTP')}
       else {
         const OTP=Random.generate(6)
         let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAILPASSWORD,
            }
        })
        let info=transporter.sendMail({
            from:process.env.EMAIL,
            to:Result.Email,
            subject:"Email Verification",
            text:'Your Email Varification',
            html:'<center>'+
            '<div class="" style="width: 30%; padding: 20px; border-radius: 20px;background-color: bisque;">'+
                '<h4>OTP</h4>'+
                +OTP+
            '</div>'+
            '</center>'
        })
        if (info) {
         let BookNoUpdate = {}
         if (info){  BookNoUpdate.BookIssueOTP = OTP}
         let UpdateData = await StudentBookRequestModel.updateOne({ _id:req.body._id }, { $set: BookNoUpdate }, { new: true, lean: true })
            res.send(Result)
        }
      }
    } catch (error) {console.log(error.message);}
}
const VarifyOTP=async(req,res)=>{
     try {
            const Result=await StudentBookRequestModel.findOne({_id:req.body._id})
            const BookIssuedDate = new Date().toLocaleDateString();
            const BookIssuedTime = new Date().toLocaleTimeString();
            
      if (Result.BookIssueOTPSend===0) {
        if(Result.BookIssueOTP==req.body.OTP){
          let BookNoUpdate = {}
          if (req.body.OTP){  BookNoUpdate.BookIssueOTPSend = 1}
          if (req.body.OTP){  BookNoUpdate.BookIssuedDate = BookIssuedDate}
          if (req.body.OTP){  BookNoUpdate.BookIssuedtime = BookIssuedTime}
          if (req.body.OTP){  BookNoUpdate.Status = 'Issued'}
          if (req.body.OTP){  BookNoUpdate.RequestStatus = 'Your Request is Issued'}
          let UpdateData = await StudentBookRequestModel.updateOne({ _id:req.body._id }, { $set: BookNoUpdate }, { new: true, lean: true })
          if (UpdateData) {
            const Data=await LMSStudentRegisterModel.findOne({Email:Result.Email})
            if (Data.BookIssue===5) {
              res.send('this Student is Already 5 Books Issued')
            } else {
              let IssuedBookUpdate = {}
            if (req.body.OTP){  IssuedBookUpdate.BookIssue = (Data.BookIssue)+1}
            let UpdateData = await LMSStudentRegisterModel.updateOne({ Email:Result.Email}, { $set: IssuedBookUpdate }, { new: true, lean: true })
            res.send('Successfully Issued Book')
            }
          }
        }else{res.send('OTP is not correct')}
      } else {res.send('Book Already Issued')}
     } catch (error) {console.log(error.message);}
}
const IssueBook=async(req,res)=>{
      try {
          const Result=await StudentBookRequestModel.find({BookIssueOTPSend:1})
          if (Result) {
             res.render('LMSIssuedBook',{Result:Result})
          } else {console.log('Server Error');}
      } catch (error) {console.log(error.message);}
}
const LMSRegisterStudent=async(req,res)=>{
       try {
        const Result=await LMSStudentRegisterModel.find()
        if (Result) {res.render('LMSRegisterStudent',{Result:Result})}
       } catch (error) {console.log(error.message);}
}
const StudentIssuedBook=async(req,res)=>{
  try {
   const Book=await StudentBookRequestModel.find({Email:req.query.Email})
   console.log(Book);
   if (Book) {res.send(Book)}
   else{res.send('NoBook')}
  } catch (error) {console.log(error.message);}
}

const LMSAdminViewStudent=async(req,res)=>{
    try {
        const Result=await LMSStudentRegisterModel.findOne({_id:req.query._id})
         if (Result) {res.send(Result) }
        } catch (error) {console.log(error.message);}
}
const LMSAdminStudentDelete=async(req,res)=>{
  try {
    const Result=await LMSStudentRegisterModel.deleteOne({_id:req.query._id})
     if (Result) {
      let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAILPASSWORD,
        }
    })
    let info=transporter.sendMail({
        from:process.env.EMAIL,  
        to:Result.Email,
        subject:"LMS Admin Delete Student",
        text:'LMS Admin Delete Student',
        html:'Your Account Delete : '+ req.query.Reason
    })
      if (info) {res.send('Successfully Delete Student')}
    }
    } catch (error) {console.log(error.message);}
}
const LMSRejectRequest=async(req,res)=>{
  try {
    const Result=await StudentBookRequestModel.find({Status:'Reject'})
    if (Result) {res.render('LMSRejectRequest',{Result:Result})}
   } catch (error) {console.log(error.message);}
}
const LMSRejectRequestDetails=async(req,res)=>{
  try {
    const Result=await StudentBookRequestModel.findOne({_id:req.body._id})
    if (Result) {res.send(Result)}
   } catch (error) {console.log(error.message);}
}
const LMSAllBook=async(req,res)=>{
    try {
      const Result=await LMSAllBookModel.find()
      res.render('LMSAllBook',{Result:Result})
    } catch (error) {console.log(error.message);}
}
const LMSAddBook=async(req,res)=>{
    try {
      const Result=await LMSAllBookModel.findOne({BookNO:req.body.BookNO})
      if (Result) {res.send('This Book No is Already Register')}
      else{
          const Data=new LMSAllBookModel({
             BookName:req.body.BookName,
             BookAuthorName:req.body.BookAuthorName,
             BookNO:req.body.BookNO,
             LibraryRowNO:req.body.LibraryRowNO,
             Varified:1
          })
          const SaveData=Data.save()
          if (SaveData) {res.send('Successfully Add Book')}
      }
    } catch (error) {console.log(error.message);}
}
const LMSGetBook=async(req,res)=>{
  const Result=await LMSAllBookModel.findOne({_id:req.body._id})
  if (Result) {res.send(Result)}
}
const LMSEditBook=async(req,res)=>{
  try {
    const Result=await LMSAllBookModel.findOne({_id:req.body._id})
    if (Result) {
    let EditBook = {}
          if (req.body.BookName){  EditBook.BookName = req.body.BookName}
          if (req.body.BookAuthorName){  EditBook.BookAuthorName = req.body.BookAuthorName}
          if (req.body.BookNO){  EditBook.BookNO = req.body.BookNO}
          if (req.body.LibraryRowNO){  EditBook.LibraryRowNO = req.body.LibraryRowNO}
          if (req.body.Varified){  EditBook.Varified = req.body.Varified}
          let UpdateData = await LMSAllBookModel.updateOne({ _id:req.body._id }, { $set: EditBook }, { new: true, lean: true })
          if (UpdateData) {res.send('Successfully Edit Book')}
    }
  } catch (error) {console.log(error.message);}
}
const LMSDeleteBook=async(req,res)=>{
      try {
        const Result=await LMSAllBookModel.deleteOne({_id:req.body._id})
        if (Result) {res.send('Successfully Delete Book')}
      } catch (error) {console.log(error.message);}
}
module.exports={ 
    adminRegister,
    adminLogin,
    AdminDashboard,
    AdminDashboardLogout,
    AdminViewDetails,
    AdminStudentRequestBookNO,
    AdminStudentRequestDelete,
    AdminComfirmRequest,
    LMSAdminRejectRequestReason,
    AdminComfirmRequestSendOTP,
    VarifyOTP,
    IssueBook,
    LMSRegisterStudent,
    StudentIssuedBook,
    LMSAdminViewStudent,
    LMSAdminStudentDelete,
    LMSRejectRequest,
    LMSRejectRequestDetails,
    LMSAllBook,
    LMSAddBook,
    LMSGetBook,
    LMSEditBook,
    LMSDeleteBook,
}