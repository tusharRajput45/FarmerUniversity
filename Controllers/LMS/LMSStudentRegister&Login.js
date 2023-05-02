const LMSStudentRegisterModel=require('../../Model/LMS/LMSStudentRegisterModel')
const LMSStudentBookRequestModel=require('../../Model/LMS/studentBookRequestModel')
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt');  
const SecurePassword=async(Password)=>{             // Secure Password Api
    try {
const passwordHash=await bcrypt.hash(Password,10);
        return passwordHash;
    } catch (error) {console.log(error.message);}
    }
const StudentRegister=async(req,res)=>{
            try {
                const CheckEmail=await LMSStudentRegisterModel.findOne({Email:req.body.Email})
                const CheckCollegeID=await LMSStudentRegisterModel.findOne({CollegeID:req.body.CollegeID})
                const CheckMobile=await LMSStudentRegisterModel.findOne({Mobile:req.body.Mobile})
                const RegisterDate = new Date().toLocaleDateString();
                const RegisterTime = new Date().toLocaleTimeString();
                const Password=await SecurePassword(req.body.Password)
                if (!CheckEmail) {
                    if (!CheckCollegeID) {
                        if (!CheckMobile) {
                            const Data=new LMSStudentRegisterModel({
                                Name:req.body.Name,
                                Email:req.body.Email,
                                Mobile:req.body.Mobile, 
                                CollegeID:req.body.CollegeID,
                                Password,
                                RegisterDate,
                                RegisterTime,
                            })
                            const SaveData=Data.save();
                            if (SaveData) {res.send('Successfully Register')}
                            else{res.send('DataBase Error')}
                        } else {res.send('Mobile is Already use')}
                    } else {res.send('CollegeID is Already use')}
                } else {res.send('Email is Already use')}
            } catch (error) {console.log(error.message);}
}
const LMSLoginEmailVarify=async(req,res)=>{
          try {
            const CheckEmail=await LMSStudentRegisterModel.findOne({Email:req.body.Email})
            if (CheckEmail) {
                if (CheckEmail.EmailVarify===0) {
                    let transporter=nodemailer.createTransport({
                        service:'gmail',
                        auth:{
                            user:process.env.EMAIL,
                            pass:process.env.EMAILPASSWORD,
                        }
                    })
                    let info=transporter.sendMail({
                        from:process.env.EMAIL,
                        to:CheckEmail.Email,
                        subject:"Email Verification",
                        text:'Your Email Varification',
                        html:'<center>'+
                        '<div class="" style="width: 30%; padding: 20px; border-radius: 20px;background-color: bisque;">'+
                            '<h4>Email Varification</h4>'+
                            '<a href="http://localhost:3000/LMS/LMSLoginEmailVarified?Email='+CheckEmail.Email+'" style="background-color: brown;text-decoration: none;padding: 10px;color: white;border-radius: 10px;" class="varify">Varify</a>'+
                        '</div>'+
                        '</center>'
                    })
                    console.log("Send Email");
                    res.send("Succesfully Send Email")
                } else {res.send('Email Already Varify')}
            } else {res.send('Email is not Exist')}
          } catch (error) {console.log(error.message);}
}
const LMSLoginEmailVarified=async(req,res)=>{
            try {
                const CheckEmail=await LMSStudentRegisterModel.findOne({Email:req.query.Email})
                if (CheckEmail) {
                    if (CheckEmail.EmailVarify===0) {
                        let VarifyEmail = {}
                        if (req.query.Email){  VarifyEmail.EmailVarify = 1}
                        let UpdateData = await LMSStudentRegisterModel.updateOne({ Email:req.query.Email }, { $set: VarifyEmail }, { new: true, lean: true })
                       if (UpdateData) {
                        console.log('Varify Email');
                       } 
                    } else {res.send('Email is Already Varify')}
                } else {res.send('Email is not Exist')}
            } catch (error) {console.log(error.message);}
}
const StudentLogin=async(req,res)=>{
            try {
                const CheckCollegeID=await LMSStudentRegisterModel.findOne({Email:req.body.Email})
                if (CheckCollegeID) {
                    if (CheckCollegeID.EmailVarify===1) {
                        const MatchPassword=await bcrypt.compare(req.body.Password,CheckCollegeID.Password)
                        if (MatchPassword) {
                            req.session.Student_id=CheckCollegeID._id;
                            res.send(CheckCollegeID.CollegeID)
                        } else {res.send('Password is wrong')}
                    } else {res.send('Email is not Varify')}
                } else {res.send('Email is not Exist')}
            } catch (error) {console.log(error.message);}
}
const StudentDashboard=async(req,res)=>{
    try {
        const CheckEmail=await LMSStudentBookRequestModel.find({CollegeID:req.query.CollegeID})
        const Result=await LMSStudentRegisterModel.findOne({CollegeID:req.query.CollegeID})
        if (CheckEmail) {
            res.render('LMSStudentDashboard',{Result:CheckEmail,Result2:Result})
        } else {console.log("DataBase Error");}
    } catch (error) {console.log(error.message);}
}
const StudentLogout=async(req,res)=>{
      try {
                 req.session.destroy() 
                 res.send('Logout Successfully')
      } catch (error) {console.log(error.message);}
}
module.exports={
    StudentRegister,
    LMSLoginEmailVarify,
    LMSLoginEmailVarified,
    StudentLogin,
    StudentDashboard,
    StudentLogout,
}