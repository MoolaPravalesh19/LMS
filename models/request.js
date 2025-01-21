const mongoose=require("mongoose");
let Schema=mongoose.Schema;

let RequestSchema=new Schema({
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
    returndate:{
        type:String,
        required:true
    }

});

const RequestBook=mongoose.model("Requestbook",RequestSchema);
module.exports=RequestBook;