const mongoose=require('mongoose')
const DataBase=mongoose.connect(process.env.DATABASE).then(()=>{console.log("CONNECT DATABASE SERVER SUCCESSFULLY");})
.catch(()=>{console.log('MONGODB ERROR');})
module.exports=DataBase