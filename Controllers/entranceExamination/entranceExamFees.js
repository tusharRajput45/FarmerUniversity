const entranceExamRegister=require('../../Model/entranceExaminationModels/entranceExamRegister')
const entranceExamRegistrationPD=require('../../Model/entranceExaminationModels/entranceExamRegistrationPD')
const entranceExamFeesPayment=require('../../Model/entranceExaminationModels/entranceExamFeesPayment')
const entranceExamPaymentCardDetails=require('../../Model/entranceExaminationModels/entranceExamPaymentCardDetails')


const Reandom=require('generate-serial-number')
 

const entranceExamFees=async(req,res)=>{
       try { 
        const CheckEmail=await entranceExamRegister.findOne({Email:req.query.Email})
          if(CheckEmail){ 
            const CheckEmail2=await entranceExamRegistrationPD.findOne({Email:req.query.Email})
            const Result=await entranceExamPaymentCardDetails.findOne({RegistrationNO:CheckEmail2.RegistrationNO})
            if (Result) {console.log("Payment Already Success"); }
            else{
              const PaymentReferenceNO='E-'+(Reandom.generate(12))
              res.render('entranceExamFees',{Result:CheckEmail2,PaymentReferenceNO:PaymentReferenceNO})
            }
          }
       } catch (error) {console.log(error.message);}
}
const entranceExamFeesPay=async(req,res)=>{
    try {
        const CheckEmail=await entranceExamRegister.findOne({Email:req.query.Email})
          if(CheckEmail){
            const CheckEmail2=await entranceExamRegistrationPD.findOne({Email:req.query.Email})
            if(CheckEmail2){
              const CheckEmail3=await entranceExamFeesPayment.findOne({PaymentReferenceNO:req.query.PaymentReferenceNO})
              if (CheckEmail3) {
                res.render('entranceExamFeesPay',{Result:CheckEmail2,Result2:CheckEmail3})
              }
            }
          }
       } catch (error) {console.log(error.message);}
}
const PostentranceExamFeesPay=async(req,res)=>{
    if (req.query) {
        try {
            const PaymentDate = new Date().toLocaleDateString();
            const PaymentTime = new Date().toLocaleTimeString();
          const Data=new entranceExamFeesPayment({
            RegistrationNO: req.body.RegistrationNO,
            PaymentReferenceNO: req.body.PaymentReferenceNO, 
            Email: req.body.Email,
            PaymentDate,
            PaymentTime,
          })
          const SaveData=await Data.save();
          console.log(SaveData.PaymentReferenceNO);
          if(SaveData){res.send(SaveData.PaymentReferenceNO)}
        } catch (error) {console.log(error.message);}
    }
}
const PostentranceExamFeesPaymentStatus=async(req,res)=>{
      const Result=await entranceExamFeesPayment.findOne({RegistrationNO:req.body.RegistrationNO})
      if (Result) {
        res.send(Result.Email)
      }
}
const GetentranceExamFeesPaymentStatus=async(req,res)=>{
       const Result=await entranceExamFeesPayment.find({Email:req.query.Email})
       const Data=await entranceExamRegister.findOne({Email:req.query.Email})
       res.render('entranceExamFeesPaymentStatus',{Result:Result,Name:Data.Name})
}
const entranceExamPaymentCardDetail=async(req,res)=>{
            const PaymentDate = new Date().toLocaleDateString();
            const PaymentTime = new Date().toLocaleTimeString();
            const Result=await entranceExamFeesPayment.findOne({RegistrationNO:req.body.RegistrationNO})
            if (Result) {
              try {
                const Data=entranceExamPaymentCardDetails({
                             RegistrationNO:req.body.RegistrationNO,
                             PaymentReferenceNO:req.body.PaymentReferenceNO,
                             PaymentAmount:req.body.PaymentAmount,
                             OwnerName:req.body.OwnerName,
                             CardNO:req.body.CardNO,
                             ExpireDate:req.body.ExpireDate,
                             ExpireYear:req.body.ExpireYear,
                             PaymentDate,
                             PaymentTime,
                             PaymentStatus:'Success',
                })
                const SaveData=Data.save()
                if (SaveData) {
                  let PaymentStatusUpdate = {}
                  if (SaveData){  PaymentStatusUpdate.PaymentStatus = 'Success'}
                  let UpdateData = await entranceExamFeesPayment.updateOne({ PaymentReferenceNO:req.body.PaymentReferenceNO }, { $set: PaymentStatusUpdate }, { new: true, lean: true })
                  res.send('Successfully Payment')
              }
              } catch (error) {console.log(error.message);}
            }else{res.send('Payment Failed')}
}
module.exports={
    entranceExamFees,
    entranceExamFeesPay,
    PostentranceExamFeesPay,
    PostentranceExamFeesPaymentStatus,
    GetentranceExamFeesPaymentStatus,
    entranceExamPaymentCardDetail,
}