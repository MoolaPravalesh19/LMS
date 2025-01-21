require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Book=require("../models/bookdetails.js");
const Admin=require("../models/Admin.js");
const IssueBook=require("../models/issued-books.js");
const RequestBook=require("../models/request.js");
const Student = require('../models/student.js');
const bookdata = require("./data.js");
const studentData = require("./data.js");
const admindata = require("./data.js");
const bcrypt = require('bcrypt');


// const MONGO_URL="mongodb://127.0.0.1:27017/lms";
// main().then(()=>{
//     console.log("connected DB");
// })
// .catch((err)=>{
//     console.log(err);
// })
// async function main(){
//     await mongoose.connect(MONGO_URL);   
// }
const dburl=process.env.ATLASDB_URL;
mongoose.connect(dburl);

const books = bookdata.data1;
const students = studentData.data2;
const admin = admindata.sampleadmins;

const addStudents = async () => {
    

    for (let student of students) {
        // Hash the password
       let hashpassword=await bcrypt.hash(student.password,10);
        // Create a new student object with the hashed password
        let studentdetails= new Student({
            username: student.username,
            branch: student.branch,
            email: student.email,
            password:hashpassword
        });
        console.log(student.password);
        studentdetails.save();
        
    }

    // Insert all students at once
    console.log("Students added with hashed passwords");
};
//Call the function to add students

const addadmin = async()=>{
    let hashpassword=await bcrypt.hash(admin.password,10);
    let admin1 = new Admin({
        username: admin.username,
        Email:admin.Email,
        Phonenumber:admin.Phonenumber,
        password:hashpassword
    })
    admin1.save();
}

const initDBB = async () => {
    await Book.insertMany(books);
    addStudents();
    addadmin();
    console.log("data saved");
}
initDBB();