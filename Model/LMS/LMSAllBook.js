const { default: mongoose } = require("mongoose");

const Schema=mongoose.Schema({
        BookName:{
            type:String,
            required:true,
        },
        BookAuthorName:{
            type:String,
            required:true,
        },
        BookNO:{
            type:Number,
            required:true,
            unique:true,
        },
        LibraryRowNO:{
            type:String,
            required:true,
        },
        Varified:{
            type:Number,
            default:0,
        }
})
const LMSAllBook=mongoose.model('LMSAllBook',Schema)
module.exports=LMSAllBook