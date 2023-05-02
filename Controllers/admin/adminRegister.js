const bcrypt=require('bcrypt')
const adminRegister=require('../../Model/adminRegister')

const SecurePassword=async(Password)=>{
    try {
        const passwordHash=await bcrypt.hash(Password,10);
        return passwordHash;
    } catch (error) {console.log(error.message);}
    }
const PostadminRegister=async(req,res)=>{
    const Result=await adminRegister.findOne({Email:req.query.Email})
    const Mobile=await adminRegister.findOne({Email:req.query.Mobile})

    if(Result){res.send('Email is already Register')}
    else{
    try {
        const Password=await SecurePassword(req.query.Password)
        const RegisterDate = new Date().toLocaleDateString();
        const RegisterTime = new Date().toLocaleTimeString();
        const Data=new adminRegister({
            Name:req.query.Name,
            Email:req.query.Email,
            Mobile:req.query.Mobile,
            Password:Password,
            RegisterDate,
            RegisterTime,
        })
        const SaveData=Data.save()
        if(SaveData){res.send('Register')}
        else{res.send('Register not')}
    } catch (error) {console.log(error.message);}}
}
const adminRegisterLogin=async(req,res)=>{
    const CheckEmail=await adminRegister.findOne({Email:req.body.Email})
        const LoginDate = new Date().toLocaleDateString();
        const LoginTime = new Date().toLocaleTimeString();
    if(CheckEmail){
        try {
            if(CheckEmail.Varified===1){
                if(CheckEmail.__v===1){
                    if(CheckEmail.Login_Varified===0){
                      const HashPassword=await bcrypt.compare(req.body.Password,CheckEmail.Password)
                      if(HashPassword){
                        let adminLogin = {}
                        if (CheckEmail){   adminLogin.Login_Varified = 0}
                        if (CheckEmail){   adminLogin.Login_Date = LoginDate}
                        if (CheckEmail){   adminLogin.Login_Time = LoginTime}
                        let UpdateData = await adminRegister.updateOne({ Email:req.body.Email }, { $set: adminLogin }, { new: true, lean: true })   
                        if(UpdateData){
                           req.session.admin_ID=CheckEmail._id;
                           res.send(CheckEmail.Email)     
                        }
                      }else{res.send('Password is Wrong')}
                    }else{res.send('You are already Login')}
                }else{res.send('Email is Blocked')}
            }else(res.send('Email is not Varify')) 
        } catch (error) {console.log(error.message);}
    }else{res.send('Email is not Exist')}
}
const adminDashboard=async(req,res)=>{
    const Checkmail=await adminRegister.findOne({Email:req.query.Email})
    if(Checkmail){
        res.render('adminDashboard',{Result:Checkmail})
    }
}
const adminLogout=async(req,res)=>{
    const CheckEmail=await adminRegister.findOne({Email:req.query.Email})
    if(CheckEmail){
        try {
            let adminLogout = {}
            if (CheckEmail){   adminLogout.Login_Varified = 0}
            if (CheckEmail){   adminLogout.Login_Date = 0}
            if (CheckEmail){   adminLogout.Login_Time = 0}
            let UpdateData = await adminRegister.updateOne({ Email:req.query.Email }, { $set: adminLogout }, { new: true, lean: true })   
            if(UpdateData){
                 req.session.destroy() 
                 res.send('Logout Successfully')
             }else('Already Logout')
        } catch (error) {console.log(error);}
    }else{res.send('Already Logout')}
    }   
module.exports={
    PostadminRegister,
    adminRegisterLogin,
    adminDashboard,
    adminLogout,
}