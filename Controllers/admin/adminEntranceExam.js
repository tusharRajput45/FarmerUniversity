const entranceExamFinalSubmit = require('../../Model/entranceExaminationModels/entranceExamFinalSubmit');
const entranceExamRegister=require('../../Model/entranceExaminationModels/entranceExamRegister')

const adminentranceExamRegister=async(req,res)=>{
    try {
        const Result=await entranceExamRegister.find();
        if(Result){res.render('adminentranceExamRegister',{Result:Result})}
    } catch (error) {console.log(error.message);}
}
const GetadminentranceExamEditRegister=async(req,res)=>{
    try {
        const Result=await entranceExamRegister.findOne({_id:req.body._id});
        if(Result){res.send(Result)}
    } catch (error) {console.log(error.message);}
}
const PostadminentranceExamEditRegister=async(req,res)=>{
    try {
        const Chechmail=await entranceExamRegister.findOne({Email:req.body.Email})
        if(Chechmail){
        let adminEntranceExamRegisterUpdate = {}
        if (req.body.Name){   adminEntranceExamRegisterUpdate.Name = req.body.Name}
        if (req.body.Email){  adminEntranceExamRegisterUpdate.Email = req.body.Email}
        if (req.body.Mobile){  adminEntranceExamRegisterUpdate.Mobile = req.body.Mobile}
        if (req.body.Varified){  adminEntranceExamRegisterUpdate.Varified = req.body.Varified}
        let UpdateData = await entranceExamRegister.updateOne({ Email:req.body.Email }, { $set: adminEntranceExamRegisterUpdate }, { new: true, lean: true })        
        if(UpdateData){res.send('Update Successfully')}}
    } catch (error) {console.log(error.message);}
}
const adminentranceExamDeleteRegister=async(req,res)=>{
    try {
        const Result=await entranceExamRegister.deleteOne({_id:req.body._id});
        if(Result){res.send('Successfully Delete Register')}
    } catch (error) {console.log(error.message);}
}
const adminDeleteEntranceExamForm=async(req,res)=>{
    try {
        const Result=await entranceExamFinalSubmit.deleteOne({_id:req.query._id})
        if (Result) {res.send('Successfully Delete')}
    } catch (error) {console.log(error.message);}
}

module.exports={
    adminentranceExamRegister,
    GetadminentranceExamEditRegister,
    PostadminentranceExamEditRegister,
    adminentranceExamDeleteRegister,
    adminDeleteEntranceExamForm,
}