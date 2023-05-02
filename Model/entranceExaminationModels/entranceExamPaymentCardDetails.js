const { default: mongoose } = require("mongoose");

const Schema=mongoose.Schema({
    RegistrationNO: {
        type:String,
        unique:true,
        require:true,
    },
    PaymentReferenceNO: {
        type:String,
        unique:true,
        require:true,
    },
    PaymentAmount: {
        type:String,
        require:true,
    },
    OwnerName: {
        type:String,
        require:true,
    },
    CardNO: {
        type:String,
        require:true,
    },
    ExpireDate: {
        type:String,
        require:true,
    },
    ExpireYear: {
        type:String,
        require:true,
    },
    PaymentDate: {
        type:String,
        require:true,
    },
    PaymentTime: {
        type:String,
        require:true,
    },
    PaymentStatus:{
        type:String,
        default:'Pending'
    }
})
const entranceExamPaymentCardDetails=mongoose.model('entranceExamPaymentCardDetails',Schema)
module.exports=entranceExamPaymentCardDetails