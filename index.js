if(process.env.NODE_ENV!="production"){
  require('dotenv').config()

}

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const ExpressError = require("./utils/ExpressErrors.js");
const wrapAsync = require("./utils/WrapAsync.js");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Admin = require("./models/Admin.js");
const Student = require("./models/student.js");
const Book = require("./models/bookdetails.js");
const Request = require("./models/request.js");
const issueBook = require("./models/issued-books.js");
let returnbook=require("./models/returned-books.js");
const bcrypt = require("bcrypt");
const port = 8000;
require("./config/passport.js")(passport);
const Accept=require("./models/accepted.js");
const Reject=require("./models/rejected.js");
const MongoStore = require('connect-mongo');


const libraryRouter=require("./routes/library.js");
const AdminRouter=require("./routes/admin.js");
const Accepted = require("./models/accepted.js");
const StudentRouter=require("./routes/Student.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

// const MONGO_URL = "mongodb://127.0.0.1:27017/lms";
const dburl=process.env.ATLASDB_URL
// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }
mongoose.connect(dburl);


// Session options
let sessionOptions = {
  secret: process.env.SECRET, // Use a strong secret
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
  },
}

app.use(session(sessionOptions)); // Creating session
app.use(flash()); // Alert message

app.use(passport.initialize());
app.use(passport.session());


// app.use("/listings/:id/reviews",reviewRouter);
// app.use("/",userRouter);

app.listen(port, () => {
  console.log(`The server has started at port number ${port}`);
});

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/library",libraryRouter);
app.use("/Admin",AdminRouter);
app.use("/Student",StudentRouter);
app.get("/",(req,res)=>{
  res.redirect("/library");
});

// app.get(
//   "/library",
//   wrapAsync((req, res) => {
//     res.render("Login/login.ejs");
//   })
// );

// app.get("/library/registration", (req, res) => {
//   res.render("Login/registration.ejs");
// });

// app.post(
//   "/library/admin",
//   passport.authenticate("admin", {
//     failureRedirect: "/library",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     const admin = await Admin.find({ username: req.body.username });
//     let adminarray = admin[0];
//     const bookCount = await Book.countDocuments({});
//     const students = await Student.countDocuments({});
//     const Requests = await Request.countDocuments({});
//     const Issues = await IssueBook.countDocuments({});
//     const Returns = await ReturnBook.countDocuments({});
//     console.log(bookCount);
//     console.log(req.body);
//     res.render("admin/Dashboard.ejs", { adminarray, bookCount, students,Requests,Issues,Returns });
//   }
// );


// app.post(
//   "/library/student",
//   passport.authenticate("student", {
//     failureRedirect: "/library",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     const student = await Student.find({ username: req.body.username });
//     let studentarray = student[0];
//     console.log(studentarray);
//     console.log(student);
//     const bookCount = await Book.countDocuments({});

//     res.render("student/Dashboard.ejs", { studentarray, bookCount });
//   }
// );

// app.post("/library", async (req, res) => {
//   try {
//     let hashpassword=await bcrypt.hash(req.body.Password,10);
//     let { name, branch, email, password } = req.body;
//     let studentDetails = {
//       username: name,
//       branch: branch,
//       email: email,
//       password:hashpassword
//     };
//     studentDetails.save();
//     req.flash("success","Registration request is successfully done!");
//     res.redirect("/library");
//   } catch (e) {
//     req.flash("error", e.message);
//     res.redirect("/library");
//   }
// });

//dashboard

//admin
// app.post(
//   "/Admin/book-request",
//   wrapAsync(async (req, res) => {
//     let requestdetails = {
//       Libraryid: req.body.libraryid,
//       Studentname: req.body.username,
//       Branch: req.body.branch,
//       Bookname: req.body.bookname,
//       Bookid: req.body.bookid,
//     };
//     let checkrequest = await Request.findOne(requestdetails);
//     if (checkrequest) {
//       req.flash(
//         "error",
//         "Book Request already done wait for admin response"
//       );
//       return res.redirect("/Dashboard/issue-book");
//     } 
//     else {
//       try {
//         // Validate Library ID
//         // const libraryid = await Student.findById(req.body.libraryid);
//         // if (!libraryid) {
//         //     req.flash("error", "Invalid Library ID");
//         //     return res.redirect("/Dashboard/issue-book");
//         // }

//         // Validate Student Name and Branch
//         const student = await Student.findOne({
//           _id: req.body.libraryid,
//           username: req.body.username,
//           branch: req.body.branch,
//         });
//         if (!student) {
//           req.flash("error", "Student credentials do not match");
//           return res.redirect("/Dashboard/issue-book");
//         }

//         // Validate Book ID
//         const bookid = await Book.findById(req.body.bookid);
//         if (!bookid) {
//           req.flash("error", "Invalid Book ID");
//           return res.redirect("/Dashboard/issue-book");
//         }

//         // Validate Book Name with Book ID
//         const book = await Book.findOne({
//           _id: req.body.bookid,
//           Title: req.body.bookname,
//         });
//         if (!book) {
//           req.flash("error", "Book name does not match the Book ID");
//           return res.redirect("/Dashboard/issue-book");
//         }

//         // If all validations pass, create a new request
//         let request = new Request({
//           Libraryid: req.body.libraryid,
//           Studentname: req.body.username,
//           Branch: req.body.branch,
//           Bookname: req.body.bookname,
//           Bookid: req.body.bookid,
//           Issuedate: req.body.issuedate,
//           returndate: req.body.returndate,
//         });
//         await request.save();
//         req.flash("success", "Successfully requested the book");
//         res.redirect("/Dashboard/issue-book");
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         req.flash("error", "An error occurred while processing your request");
//         res.redirect("/Dashboard/issue-book");
//       }
//     }
//   })
// );
// app.get("/Admin/Dashboard/Books", async (req, res) => {
//   const Books = await Book.find({});
//   res.render("admin/booklist.ejs", { Books });
// });
// app.get("/Admin/Add-book", (req, res) => {
//   res.render("admin/addbook.ejs");
// });

// app.post("/Admin/new-book", (req, res) => {
//   console.log(req.body);
//   let newBook = new Book({
//     Title: req.body.bookname,
//     Author: req.body.Author,
//     ISBN: req.body.ISBN,
//     Edition: req.body.Edition,
//   });

//   newBook.save();
//   req.flash("success", "New Book Details are successfully add");
//   res.redirect("/Admin/Add-book");
// });
// app.get("/Admin/Book-requests",wrapAsync(async(req,res)=>{
//     let request=await Request.find({});
//     res.render("admin/bookrequested.ejs",{request});
// }));

// app.post("/Admin/:id/returns",async(req,res)=>{
//     let {id}=req.params;
//     console.log(id);
//     const returns=await Request.findById(id);
//     let issuereturns = new issueBook({
//         Libraryid: returns.Libraryid,
//         Studentname: returns.Studentname,
//         Branch: returns.Branch,
//         Bookname: returns.Bookname,
//         Bookid: returns.Bookid,
//         Issuedate: returns.Issuedate,
//         Returndate: returns.returndate,
//       });
//       issuereturns.save();
//       const returnsrequest=await Request.findByIdAndDelete(id);
//       let request=await Request.find({});
//     res.render("admin/bookrequested.ejs",{request});
//       req.flash("success","Request returnsed");
// })
// app.post("/Admin/:id/Reject",async(req,res)=>{
//     let {id}=req.params;
//     console.log(id);
//     await Request.findByIdAndDelete(id);
//     let request=await Request.find({});
//     res.render("admin/bookrequested.ejs",{request});
//     req.flash("error","Request Rejected");
// });

// app.get("/Admin/students",async(req,res)=>{
//   let student=await Student.find({});
//   res.render("admin/students.ejs",{student})
// });
// app.get("/Admin/Add-Admin",(req,res)=>{
//   res.render("admin/add-admin.ejs");
// })
// app.post("/Admin/new-admin",async(req,res)=>{
//   console.log(req.body);

//   let hashpassword=await bcrypt.hash(req.body.Password,10);
//   let newadmin= Admin({
//     username:req.body.admin,
//     Email:req.body.Email,
//     Phonenumber:req.body.Phonenumber,
//     password:hashpassword
//   })
//   console.log(newadmin);
//   newadmin.save();
//   req.flash("success","New Admin Details Added");
//   res.redirect("/Admin/Add-Admin");
  
// });

// app.get("/Admin/issued-books",async(req,res)=>{
//   let issues=await issueBook.find({});
//   res.render("admin/issued-books.ejs",{issues});
// })
// app.get("/Admin/Returned-books",async(req,res)=>{
//   let returns=await returnbook.find({});
//   res.render("admin/returned-books.ejs",{returns});
// })

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  console.log(statusCode, message);
  res.status(statusCode).render("error.ejs", { message });
});
