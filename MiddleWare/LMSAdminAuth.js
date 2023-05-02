const LMSAdminLogin=async(req,res,next)=>{
    try {
        if(req.session.Admin_ID){}
        else{
            res.redirect('/LMS')
        }
        next();
    } catch (error) {console.log(error.message);}
}
const LMSAdminLogout=async(req,res,next)=>{
    try {
        if(req.session.Admin_ID){
            res.redirect('LMS')
        }
        next()
    } catch (error) {console.log(error.message);}
}
module.exports={
    LMSAdminLogin,
    LMSAdminLogout,
}