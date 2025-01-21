const mongoose=require("mongoose");
let Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
let AdminSchema=new Schema({
    username:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true
    },
    Phonenumber:{
        type:String,
        required:true
    },
    password:{
        type:String
    }
});

AdminSchema.plugin(passportLocalMongoose);
const Admininfo=mongoose.model("Admininfo",AdminSchema);
module.exports=Admininfo;