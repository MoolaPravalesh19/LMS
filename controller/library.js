const Request = require("../models/request.js");
const Student = require("../models/student.js");
const Book = require("../models/bookdetails.js");
const IssueBook = require("../models/issued-books.js");
let ReturnBook = require("../models/returned-books.js");
const Accepted=require("../models/accepted.js");
const Admin=require("../models/Admin.js");
const Rejected=require("../models/rejected.js");
const bcrypt = require("bcrypt");

module.exports.login=(req, res) => {
    res.render("Login/login.ejs");
}
module.exports.registration=(req, res) => {
    res.render("Login/registration.ejs");
}
module.exports.verifyadmin=async (req, res) => {
    const admin = await Admin.find({ username: req.body.username });
    let adminarray = admin[0];
    const bookCount = await Book.countDocuments({});
    const students = await Student.countDocuments({});
    const Requests = await Request.countDocuments({});
    const Issues = await IssueBook.countDocuments({});
    const Returns = await ReturnBook.countDocuments({});
    console.log(bookCount);
    console.log(req.body);
    res.render("admin/Dashboard.ejs", { adminarray, bookCount, students,Requests,Issues,Returns });
}
module.exports.verifystudent=async (req, res) => {
      const student = await Student.find({ username: req.body.username });
      console.log(req.body);
      let studentarray = student[0];
      console.log(studentarray);
      console.log(student);
      const bookCount = await Book.countDocuments({});
      const Issues = await IssueBook.countDocuments({Studentname:req.body.username});
      console.log(Issues);
      const Returns = await ReturnBook.countDocuments({Studentname:req.body.username});
      const Accepts = await Accepted.countDocuments({Studentname:req.body.username});
      const Rejects = await Rejected.countDocuments({Studentname:req.body.username});
      res.render("student/Dashboard.ejs", { studentarray, bookCount,Issues,Returns,Accepts,Rejects});
}
module.exports.register=async(req,res)=>{
  let { name, branch, email, password } = req.body;
      console.log(req.body);
      let check=await Student.findByUsername(name);
      
      if(check==null){
        
        console.log(password);
      let hashpassword=await bcrypt.hash(password,10);
      console.log(hashpassword);
      let studentDetails = Student({
        username: name,
        branch: branch,
        email: email,
        password:hashpassword
      });
      studentDetails.save();
      req.flash("success","Registration is successfully done");
      res.redirect("/library");
      }
      else{
        req.flash("error","Student had already registered");
        res.redirect("/library");
      }
}