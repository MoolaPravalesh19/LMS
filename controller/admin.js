const Request = require("../models/request.js");
const Student = require("../models/student.js");
const Book = require("../models/bookdetails.js");
const issueBook = require("../models/issued-books.js");
let returnbook = require("../models/returned-books.js");
const Accepted=require("../models/accepted.js");
const Admin=require("../models/Admin.js");
const Rejected=require("../models/rejected.js");
const bcrypt = require("bcrypt");

module.exports.request=
    async (req, res) => {
        let { id } = req.params;
        console.log(id);
      const postedLibraryId = req.body.libraryid;
      const student = await Student.findById(id);
      if (student._id.toString() !== postedLibraryId) {
        req.flash("error", "Library ID does not match your account.");
        return res.redirect(`/Student/${id}/issue-book`)
      }
      else{
        console.log(id == req.body.libraryid);
          console.log(req.params);
          let requestdetails = {
            Libraryid: req.body.libraryid,
            Studentname: req.body.username,
            Branch: req.body.branch,
            Bookname: req.body.bookname,
            Bookid: req.body.bookid,
          };
          let checkrequest = await Request.findOne(requestdetails);
          if (checkrequest) {
            req.flash("error", "Request already done wait for admin response");
            return res.redirect(`/Student/${id}/issue-book`)
          }
          else {
            try {
              const student = await Student.findOne({
                _id: req.body.libraryid,
                username: req.body.username,
                branch: req.body.branch,
              });
              if (!student) {
                req.flash("error", "Student credentials do not match");
                return res.redirect(`/Student/${id}/issue-book`);
              }
    
              // Validate Book Name with Book ID
              const book = await Book.findOne({
                _id: req.body.bookid,
                Title: req.body.bookname,
              });
              if (!book) {
                req.flash("error", "Book name does not match the Book ID");
                return res.redirect(`/Student/${id}/issue-book`)
              }
    
              // If all validations pass, create a new request
              let request = new Request({
                Libraryid: req.body.libraryid,
                Studentname: req.body.username,
                Branch: req.body.branch,
                Bookname: req.body.bookname,
                Bookid: req.body.bookid,
                Issuedate: req.body.issuedate,
                returndate: req.body.returndate,
              });
              await request.save();
              req.flash("success", "Successfully requested the book");
              res.redirect(`/Student/${id}/issue-book`)
            } catch (error) {
              console.error("Error fetching data:", error);
              req.flash("error", "An error occurred while processing your request");
              res.redirect(`/Student/${id}/issue-book`);
            }
          }
        }
}

module.exports.books=async (req, res) => {
    const Books = await Book.find({});
    res.render("admin/booklist.ejs", { Books });
  }

module.exports.Addbook=(req, res) => {
    res.render("admin/addbook.ejs");
  }

module.exports.getRequest=async (req, res) => {
    let request = await Request.find({});
    res.render("admin/bookrequested.ejs", { request });
}

module.exports.students= async (req, res) => {
    let student = await Student.find({});
    res.render("admin/students.ejs", { student });
}

module.exports.addadmin=(req, res) => {
    res.render("admin/add-admin.ejs");
}

module.exports.issuebooks=async (req, res) => {
    let issues = await issueBook.find({});
    res.render("admin/issued-books.ejs", { issues });
}

module.exports.returnbooks=async (req, res) => {
    let returns = await returnbook.find({});
    res.render("admin/returned-books.ejs", { returns });
}

module.exports.addnewbook=(req, res) => {
    console.log(req.body);
    let newBook = new Book({
      Title: req.body.bookname,
      Author: req.body.Author,
      ISBN: req.body.ISBN,
      Edition: req.body.Edition,
    });
  
    newBook.save();
    req.flash("success", "New Book Details are successfully add");
    res.redirect("/Admin/Add-book");
}

module.exports.accept=async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const Accept = await Request.findById(id);
    let issueaccept = new issueBook({
      Libraryid: Accept.Libraryid,
      Studentname: Accept.Studentname,
      Branch: Accept.Branch,
      Bookname: Accept.Bookname,
      Bookid: Accept.Bookid,
      Issuedate: Accept.Issuedate,
      Returndate: Accept.returndate,
    });
    let issueaccepted = new Accepted({
      Libraryid: Accept.Libraryid,
      Studentname: Accept.Studentname,
      Branch: Accept.Branch,
      Bookname: Accept.Bookname,
      Bookid: Accept.Bookid,
      Issuedate: Accept.Issuedate,
      Returndate: Accept.returndate,
    });
    issueaccepted.save();
    issueaccept.save();
    const acceptrequest = await Request.findByIdAndDelete(id);
    let request = await Request.find({});
    res.render("admin/bookrequested.ejs", { request });
    req.flash("success", "Request Accepted");
  }
module.exports.addnewadmin=async (req, res) => {
    console.log(req.body);
  
    let hashpassword = await bcrypt.hash(req.body.Password, 10);
    let newadmin = Admin({
      username: req.body.admin,
      Email: req.body.Email,
      Phonenumber: req.body.Phonenumber,
      password: hashpassword,
    });
    console.log(newadmin);
    newadmin.save();
    req.flash("success", "New Admin Details Added");
    res.redirect("/Admin/Add-Admin");
  }

  module.exports.reject=async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const Reject = await Request.findById(id);
    let issuerejected = new Rejected({
      Libraryid: Reject.Libraryid,
      Studentname: Reject.Studentname,
      Branch: Reject.Branch,
      Bookname: Reject.Bookname,
      Bookid: Reject.Bookid,
      Issuedate: Reject.Issuedate,
      Returndate: Reject.returndate,
    });
    issuerejected.save();
    await Request.findByIdAndDelete(id);
    let request = await Request.find({});
    res.render("admin/bookrequested.ejs", { request });
    req.flash("error", "Request Rejected");
  }
module.exports.logout=(req,res)=>{
    req.logout((err)=>{
      if(err){
          next(err);
      }
      req.flash("success","You are succesfully logged out!")
      res.redirect("/library");
  })
}
module.exports.deletebook=async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    const deletebook= await Book.findByIdAndDelete(id);
    const Books = await Book.find({});
      res.render("admin/booklist.ejs", { Books });
}
module.exports.deletestudent=async(req,res)=>{
  let {id}=req.params;
    console.log(id);
    const deletestudent= await Student.findByIdAndDelete(id);
    const student = await Student.find({});
      res.render("admin/students.ejs", { student });
}