const StudentLogin=async(req,res,next)=>{
    try {
        if(req.session.Student_ID){}
        else{
            res.redirect('/student/')
        }
        next();
    } catch (error) {console.log(error.message);}
}
const StudentLogout=async(req,res,next)=>{
    try {
        if(req.session.Student_ID){ 
            res.redirect('Student')
        }
        next()
    } catch (error) {console.log(error.message);}
}
module.exports={
    StudentLogin,
    StudentLogout,
}