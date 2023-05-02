const LMSStudentRegisterModel=require('../../Model/LMS/LMSStudentRegisterModel')
const LMSStudentBookRequest=require('../../Model/LMS/studentBookRequestModel')

const LMSadminRegister=async(req,res)=>{
    try {
        const Result=await LMSStudentRegisterModel.find();
        res.render('adminLMSStudentRegister',{Result:Result})
    } catch (error) {console.log(error.message);}
}
const LMSadminRegisterDelete=async(req,res)=>{
    try {
        const Result=await LMSStudentRegisterModel.deleteOne({_id:req.body._id});
        if (Result) {
            res.send('Register Delete Successfully')
        }
    } catch (error) {console.log(error.message);}
}
const LMSadminRegisterEdit=async(req,res)=>{
    try {
        
    } catch (error) {console.log(error.message);}
}
const adminLMSStudentAllBookRequest=async(req,res)=>{
        try {
            const Result=await LMSStudentBookRequest.find()
            if (Result) {res.render('adminLMSAllBookRequest',{Result:Result})}
        } catch (error) {console.log(error.message);}
}
module.exports={
    LMSadminRegister,
    LMSadminRegisterDelete,
    LMSadminRegisterEdit,
    adminLMSStudentAllBookRequest,
}  