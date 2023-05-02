const entranceExaminationModels=require('../../Model/entranceExaminationModels/entranceExamFinalSubmit')
const entranceExamQuestionAnswer=require('../../Model/entranceExaminationModels/entranceExamQ&AModel')
const entranceExamKeyModel=require('../../Model/onlineExamination/entranceExamKeyModel')
const nodemailer=require('nodemailer')
const Random=require('generate-serial-number')

const SecurePassword=async(Password)=>{
    try {
        const passwordHash=await bcrypt.hash(Password,10);
        return passwordHash;
    } catch (error) {console.log(error.message);}
    }
const entranceExamLogin=async(req,res)=>{
         try {
            const Result=await entranceExaminationModels.findOne({})
         } catch (error) {console.log(error.message);}
}
const entranceExam=async(req,res)=>{
    try {
        const Data=await entranceExamQuestionAnswer.find({Varified:1})
        res.render('examPage',{Result:Data})
    } catch (error) {console.log(error.message);}
}
const entranceExaminationExamKeyExports=async(req,res)=>{
     try {
        const Result=await entranceExaminationModels.find({Varified_admin:1})
        Result.forEach(function(Result){
            const Password=Random.generate(6)
            const ExamKey=Random.generate(12)
            const SecurePassword=SecurePassword(Password)
            const SecureExamKey=SecurePassword(ExamKey)
            const Data=new entranceExamKeyModel({
                Name:Result.Name,
                Condiate_id:Result._id,
                RegistrationNO:Result.RegistrationNO,
                ExamKey:SecureExamKey,
                Password:SecureExamKey,
                Varified:1
            })
            const SaveData=Data.save()
            if (SaveData) {
                const Tranport=nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        gmail:process.env.EMAIL,
                        pass:process.env.EMAILPASSWORD
                    }
                })
                const info=Tranport.transporter({
                    from:process.env.EMAIL,
                    to:Result.Email,
                    subject:"Export Entrance Exam Exam Key",
                    text:'Your Entrance Exam Key',
                    html:'<center>'+
                    '<div class="" style="width: 30%; padding: 20px; border-radius: 20px;background-color: bisque;">'+
                        '<h4>Exam Key</h4> : '+ ExamKey +'</br>'+
                        '<h4>Password</h4> : '+Password+
                    '</div>'+
                    '</center>'
                })
            }
        })
     } catch (error) {console.log(error.message);}
}
module.exports={
    entranceExamLogin,
    entranceExam,
    entranceExaminationExamKeyExports
}