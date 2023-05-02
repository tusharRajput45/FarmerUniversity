const admission=require('../../Model/admission/admissionRegistration')
const bcrypt=require('bcrypt')
const Random=require('generate-serial-number')

const SecurePassword=async(Password)=>{
    try {
        const passwordHash=await bcrypt.hash(Password,10);
        return passwordHash;
    } catch (error) {console.log(error.message);}
    }
const admissionRegistration=async(req,res)=>{
    console.log(req.body);
     try {
        const Length=(await admission.find()).length;
        const SerialNO=202400000001+Length;
        const AdmissionNO='AD'+SerialNO;
        const Password=await SecurePassword(req.body.Password)
        const RegisterDate = new Date().toLocaleDateString();
        const RegisterTime = new Date().toLocaleTimeString();
        const Data=new admission({
            AdmissionNO,
            AcademicSession:req.body.AcademicSession,
            AdmissionFor:req.body.AdmissionFor,
            EnrollmentNO:req.body.EnrollmentNO,
            Name:req.body.Name,
            FatherName:req.body.FatherName,
            MotherName:req.body.MotherName,
            Gender:req.body.Gender,
            Religion:req.body.Religion,
            Caste:req.body.CasteCategories,
            Email:req.body.Email,
            Mobile:req.body.Mobile,
            DOB:req.body.DOB,
            AadharNO:req.body.AadharNO,
            Password,
            RegisterDate,
            RegisterTime,
        })
        const SaveData=await Data.save(); 
        if (SaveData) {res.send(SaveData)}
     } catch (error) {console.log(error.message);}  
}
const admissionLogin=async(req,res)=>{
    try {
         const Result=await admission.findOne({AdmissionNO:req.query.AdmissionNO})
         if(Result){
            const matchPassword=await bcrypt.compare(req.query.Password,Result.Password)
            if(matchPassword){
                res.send('Successfully Login')
            }else{res.send('Password is not correct')}
         }else{res.send('Admission No is not correct')}
        } catch (error) {console.log(error.message);}
}
const admissionPasswordForget=async(req,res)=>{
    try { 
         const Result=await admission.findOne({AdmissionNO:req.body.AdmissionNO})
         if(Result){
            const HashPassword=await SecurePassword(req.body.Password)
        let ForgetPassword = {}
        if (req.body.Password){  ForgetPassword.Password = HashPassword}
        let UpdateData = await admission.updateOne({ AdmissionNO:req.body.AdmissionNO }, { $set: ForgetPassword }, { new: true, lean: true })
         if(UpdateData){res.send('Successfully Update Password')}
         }else{res.send('Admission No is not correct')}
        } catch (error) {console.log(error.message);}
} 
const admissionDashboard=async(req,res)=>{
      try {
        res.render('admissionDashboard')
          } catch (error) {console.log(error.message);}
} 
const admissionRegPassModel=async(req,res)=>{
      try {
        const Result=await admission.findOne({AdmissionNO:req.query.AdmissionNO})
        if (Result) {
            res.render('admissionRegPassModel',{Result:Result})
        }
      } catch (error) {console.log(error.message);}
}
const EmailMobileSendOTP=async(req,res)=>{
    try {
        console.log(req.body);
        const Result=await admission.findOne({AdmissionNO:req.body.AdmissionNO})
        if (Result) {
            const EmailOTP=78787
            const MobileOTP=48874
            let SendOTP = {}
            if (EmailOTP){   SendOTP.EmailOTP = EmailOTP}
            if (MobileOTP){  SendOTP.MobileOTP = MobileOTP}
            let UpdateData = await admission.updateOne({ AdmissionNO:req.body.AdmissionNO }, { $set: SendOTP }, { new: true, lean: true })
            if (UpdateData) {res.send('OTP Send Successfully...!')}

        } else { 
            
        }
    } catch (error) {console.log(error.message);}
}
const EmailMobileVarify=async(req,res)=>{}
module.exports={
    admissionRegistration,
    admissionLogin,
    admissionPasswordForget,
    admissionDashboard,
    admissionRegPassModel,
    EmailMobileSendOTP,
    EmailMobileVarify,
}