const express=require("express");
const router=express.Router();
const passport = require("passport");
require("../config/passport.js")(passport);
const Student = require("../models/student.js");
const Book = require("../models/bookdetails.js");
const Request = require("../models/request.js");
const IssueBook = require("../models/issued-books.js");
const ReturnBook = require("../models/returned-books.js");
const Admin = require("../models/Admin.js");
const Accepted = require("../models/accepted.js");
const wrapAsync = require("../utils/WrapAsync.js");
let {isloggedin}=require("../middleware.js");
let libraryController=require("../controller/library.js");
const bcrypt = require("bcrypt");
const Rejected = require("../models/rejected.js");
router.get(
    "/",
    wrapAsync(libraryController.login)
  );
  
  router.get("/registration", libraryController.registration);
  
  router.post("/admin",passport.authenticate("admin", {failureRedirect: "/library",
  failureFlash: true,}),libraryController.verifyadmin);
  
  router.post("/student",passport.authenticate("student", {
  failureRedirect: "/library",failureFlash: true,}),libraryController.verifystudent);
  router.post("/registration-request",libraryController.register)
  module.exports=router;