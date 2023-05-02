const adminLogin=async(req,res,next)=>{
    try {
        if(req.session.admin_ID){}
        else{
            res.redirect('/entranceExamination')
        }
        next();
    } catch (error) {console.log(error.message);}
}
const adminLogout=async(req,res,next)=>{
    try {
        if(req.session.admin_ID){
            res.redirect('entranceExamination')
        }
        next()
    } catch (error) {console.log(error.message);}
}
module.exports={
    adminLogin,
    adminLogout,
}