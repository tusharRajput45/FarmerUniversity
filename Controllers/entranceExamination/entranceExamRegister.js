const bcrypt=require('bcrypt')
const nodemailer=require('nodemailer')
const Random=require('generate-serial-number')
const entranceExamRegister=require('../../Model/entranceExaminationModels/entranceExamRegister')
const entranceExamRegistrationPD=require('../../Model/entranceExaminationModels/entranceExamRegistrationPD')
const entranceExamFeesPayment=require('../../Model/entranceExaminationModels/entranceExamFeesPayment')
const entranceExamUplaodPhoto = require('../../Model/entranceExaminationModels/entranceExamUplaodPhoto')
const entranceExamFinalSubmit = require('../../Model/entranceExaminationModels/entranceExamFinalSubmit')


const SecurePassword=async(Password)=>{
    try {
        const passwordHash=await bcrypt.hash(Password,10);
        return passwordHash;
    } catch (error) {console.log(error.message);}
    }
const PostentranceExamRegister=async(req,res)=>{
     try {
        const CheckEmail=await entranceExamRegister.findOne({Email:req.body.Email})
        const CheckMobile=await entranceExamRegister.findOne({Mobile:req.body.Mobile})
        if (CheckEmail) {res.send('Email already Register')}
        else if(CheckMobile) {res.send('Mobile already Register')
        }else{
        const Password=await SecurePassword(req.body.Password)
        const RegisterDate = new Date().toLocaleDateString();
        const RegisterTime = new Date().toLocaleTimeString();
          const Data=new entranceExamRegister({ 
                Name:req.body.Name,
                Email:req.body.Email,
                Mobile:req.body.Mobile,
                Password, 
                RegisterDate, 
                RegisterTime,
          })
          const SaveData=Data.save();
          if (SaveData) {res.send('Successfully Register')}
          else{res.send('DataBase Error')}}
     } catch (error) {console.log(error.message);}
}
const entranceRegisterForgetPassword=async(req,res)=>{
    try {
        const Chechmail=await entranceExamRegister.findOne({Email:req.body.Email})
        if(Chechmail){
        const HashPassword=await SecurePassword(req.body.Password)
        let ForgetPassword = {}
        if (req.body.Password){  ForgetPassword.Password = HashPassword}
        if (req.body.Email){  ForgetPassword.VarifiedDate = 0}
        if (req.body.Email){  ForgetPassword.VarifiedTime = 0}
        if (req.body.Email){  ForgetPassword.Varified = 0}
        let UpdateData = await entranceExamRegister.updateOne({ Email:req.body.Email }, { $set: ForgetPassword }, { new: true, lean: true })
         if(UpdateData){res.send('Successfully Update Password')}
        }else{res.send('Email is not exist')}
    } catch (error) {console.log(error.message);}
}
const PostentranceExamRegisterEmailVarify=async(req,res)=>{
    console.log(req.body);
    try {
        const CheckEmail=await entranceExamRegister.findOne({Email:req.body.Email})
        if (CheckEmail) {
            if(CheckEmail.Varified===0){
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
                    '<a href="http://localhost:3000/entranceExamination/entranceExamRegisterEmailVarify?Email='+CheckEmail.Email+'" style="background-color: brown;text-decoration: none;padding: 10px;color: white;border-radius: 10px;" class="varify">Varify</a>'+
                '</div>'+
                '</center>'
            })
            console.log("Send Email");
            res.send("Succesfully Send Email")}
            else{res.send('Already Varify Email')}
        }else{res.send('Email is not exist')}
    } catch (error) {console.log(error.message);}
}
const entranceExamRegisterEmailVarify=async(req,res)=>{
     const CheckEmail=await entranceExamRegister.findOne({Email:req.query.Email})
     if(CheckEmail.Varified===0){
        const VarifiedDate = new Date().toLocaleDateString();
        const VarifiedTime = new Date().toLocaleTimeString();
        let VarifyEmail = {}
        if (req.query.Email){  VarifyEmail.VarifiedDate = VarifiedDate}
        if (req.query.Email){  VarifyEmail.VarifiedTime = VarifiedTime}
        if (req.query.Email){  VarifyEmail.Varified = 1}
        let UpdateData = await entranceExamRegister.updateOne({ Email:req.query.Email }, { $set: VarifyEmail }, { new: true, lean: true })
       if (UpdateData) {
        console.log(UpdateData);
        console.log('Varify Email');
       } 
    }


}
const entranceExamRegisterLogin=async(req,res)=>{
    try {
        const CheckEmail=await entranceExamRegister.findOne({Email:req.body.Email})
        if (CheckEmail) {
            if(CheckEmail.Varified===1){
                const ComparePassword=await bcrypt.compare(req.body.Password,CheckEmail.Password)
                 if(ComparePassword){
                       req.session.entranceExamDashBoard_ID=CheckEmail._id;
                       res.send(CheckEmail.Email)
                 }else{res.send('Your Password is Wrong')}
            }else{res.send('Email is not Varified , Please Varify Your Email')}
        }else{res.send('Email is not Exist , Please Try Again')}
    } catch (error) {console.log(error.message);}
}
const GetEntranceExamRegistrationPD=async(req,res)=>{
     const CheckEmail=await entranceExamRegister.findOne({Email:req.query.Email}) 
       if (CheckEmail) {
        const Result=await entranceExamRegistrationPD.findOne({Email:req.query.Email});
          if(Result){console.log('Already Register')}else{
             res.render('entranceExamRegistrationPD',{Result:CheckEmail})}
       }
}
const PostEntranceExamRegistrationPD=async(req,res)=>{
    const Result=await entranceExamRegistrationPD.findOne({Email:req.body.Email});
    if(Result){res.send('Email Already Register')}else{
        try {
            const CheckEmail=await entranceExamRegister.findOne({Email:req.body.Email}) 
            const CheckMobile=await entranceExamRegister.findOne({Mobile:req.body.Mobile}) 
            if (CheckEmail&&CheckMobile) {   
            const Length=(await entranceExamRegistrationPD.find()).length;
            const SerialNO=202300000001+Length;
            RegistrationNO='U'+SerialNO;
            const RegisterDate = new Date().toLocaleDateString();
            const RegisterTime = new Date().toLocaleTimeString();
            const Data=new entranceExamRegistrationPD({
                RegistrationNO,
                Name:req.body.Name,
                FatherName:req.body.FatherName,
                MotherName:req.body.MotherName,
                Gender:req.body.Gender,
                Categories:req.body.Categories,
                Caste:req.body.Caste,
                Email:req.body.Email,
                Mobile:req.body.Mobile,
                AadharNO:req.body.AadharNO,
                DOB:req.body.DOB,
                Country:req.body.Country,
                State:req.body.State,
                City:req.body.City,
                Address:req.body.Address,
                HighSchoolRollNO:req.body.HighSchoolRollNO,
                HighSchoolYear:req.body.HighSchoolYear,
                InterMediateRollNO:req.body.InterMediateRollNO,
                InterMediateYear:req.body.InterMediateYear,
                GurationCourse:req.body.GurationCourse,
                GurationUniversityName:req.body.GurationUniversityName,
                GurationRollNO:req.body.GurationRollNO,
                GurationYear:req.body.GurationYear,
                ClassORCourse:req.body.ClassORCourse,
                RollNO:req.body.RollNO,
                MarksObtained:req.body.MarksObtained,
                MaxMarks:req.body.MaxMarks,
                Parcentage:req.body.Parcentage,
                BoardORUniversity:req.body.BoardORUniversity,
                RegisterDate,
                RegisterTime,
                Varified:0,
            })
            const SaveData=Data.save();
            if(SaveData){res.send(true)}
            else{res.send(false)}}
        } catch (error) {console.log(error.message);}}
}
const entranceExamDashboard=async(req,res)=>{
         try {
             const CheckEmail=await entranceExamRegister.findOne({Email:req.query.Email})
             if (CheckEmail) {
                res.render('entranceExamDashboard',{Result:CheckEmail})
             }else(res.send('Plaese Try Again'))
         } catch (error) {console.log(error.message);}
}
const entranceExamDashBoardLogout=async(req,res)=>{
    try {
        req.session.destroy() 
        res.redirect('/')
    } catch (error) {console.log(error.message);} 
   
}
const entranceExamFinalPrint=async(req,res)=>{
    try {
        const CheckEmail=await entranceExamRegistrationPD.findOne({Email:req.query.Email})
        const CheckEmail2=await entranceExamFeesPayment.find({Email:req.query.Email})
        const Photo=await entranceExamUplaodPhoto.findOne({Email:req.query.Email})
        if (CheckEmail2) {
            const Result=await entranceExamFinalSubmit.findOne({Email:req.query.Email})
            if(Result){
                console.log('Already Submit Form');
            }else{
                const FinalSubmitDate = new Date().toLocaleDateString();
                const FinalSubmitTime = new Date().toLocaleTimeString();
                const Data=entranceExamFinalSubmit({
                    RegistrationNO:CheckEmail.RegistrationNO,
                    Name:CheckEmail.Name,
                    FatherName:CheckEmail.FatherName,
                    Email:CheckEmail.Email,
                    FinalSubmitDate,
                    FinalSubmitTime,
                    Final_Submit:1,
           })
           const SaveData=Data.save()
            }
           res.render('entranceExamFinalPrint',{Result:CheckEmail,Result2:CheckEmail2,Photo:Photo.Photo})
        }else(res.send('Plaese Try Again'))
    } catch (error) {console.log(error.message);}
}
module.exports={
    PostentranceExamRegister,
    entranceRegisterForgetPassword,
    PostentranceExamRegisterEmailVarify,
    entranceExamRegisterEmailVarify,
    entranceExamRegisterLogin,
    GetEntranceExamRegistrationPD,
    PostEntranceExamRegistrationPD,
    entranceExamDashboard,
    entranceExamDashBoardLogout,
    entranceExamFinalPrint,
}
