const LMSLogin=async(req,res,next)=>{
    try {
        if(req.session.Student_id){}
        else{
            res.redirect('/LMS')
        }
        next();
    } catch (error) {console.log(error.message);}
}
const LMSLogout=async(req,res,next)=>{
    try {
        if(req.session.Student_id){
            res.redirect('/LMS')
        }
        next()
    } catch (error) {console.log(error.message);}
}
module.exports={
    LMSLogin,
    LMSLogout,
}