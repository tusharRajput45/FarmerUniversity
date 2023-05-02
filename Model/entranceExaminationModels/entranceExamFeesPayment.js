const { default: mongoose } = require("mongoose");
 const Schema=mongoose.Schema({
    RegistrationNO:{
        type:String,
        required:true,
    },
  PaymentReferenceNO:{
     type:String,
     required:true,
     unique:true,
  },
  Email: {
    type:String,
    required:true,
  },
  PaymentDate:{
    type:String,
    required:true,
  },
  PaymentTime:{
    type:String,
    required:true,
  },
  PaymentStatus:{
    type:String,
    default:'Pending'
  },
  PaymentAmount:{
    type:Number,
    default:1700.00,
  },
 })
 const entranceExamFeesPayment=mongoose.model('entranceExamFeesPayment',Schema)
 module.exports=entranceExamFeesPayment