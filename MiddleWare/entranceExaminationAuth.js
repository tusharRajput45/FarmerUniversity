const entranceExamDashboardisLogin=async(req,res,next)=>{
    try {
        if(req.session.entranceExamDashBoard_ID){}
        else{
            res.redirect('/entranceExamination')
        }
        next();
    } catch (error) {console.log(error.message);}
}
const entranceExamDashboardisLogout=async(req,res,next)=>{
    try {
        if(req.session.entranceExamDashBoard_ID){
            res.redirect('entranceExamination')
        }
        next()
    } catch (error) {console.log(error.message);}
}
module.exports={
    entranceExamDashboardisLogin,
    entranceExamDashboardisLogout,
}