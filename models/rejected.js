const mongoose=require("mongoose");
let Schema=mongoose.Schema;

let RejectSchema=new Schema({
    Libraryid:{
        type:String,
        required:true,
    },
    Studentname:{
        type:String,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    Bookname:{
        type:String,
        required:true
    },
    Bookid:{
        type:String,
        required:true
    },
    Issuedate:{
        type:String,
        required:true
    },
    Returndate:{
        type:String,
        required:true
    }

});

const Rejected=mongoose.model("Rejected",RejectSchema);
module.exports=Rejected;