const mongoose=require("mongoose");
let Schema=mongoose.Schema;

let BookSchema=new Schema({
    Title:{
        type:String,
        required:true,
    },
    Author:{
        type:String,
        required:true
    },
    ISBN:{
        type:String,
        required:true
    },
    Edition:{
        type:String,
        required:true
    }
});

const Bookinfo=mongoose.model("Bookinfo",BookSchema);
module.exports=Bookinfo;