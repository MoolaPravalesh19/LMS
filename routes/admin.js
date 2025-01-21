const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../config/passport.js")(passport);
const wrapAsync = require("../utils/WrapAsync.js");
const Request = require("../models/request.js");
const Student = require("../models/student.js");
const Book = require("../models/bookdetails.js");
const issueBook = require("../models/issued-books.js");
let returnbook = require("../models/returned-books.js");
const bcrypt = require("bcrypt");
let {isloggedin}=require("../middleware.js");
const Accepted = require("../models/accepted.js");
const Rejected = require("../models/rejected.js");
const AdminController=require("../controller/admin.js");

router.post(
  "/:id/book-request",
  wrapAsync(AdminController.request)
);
router.get("/Dashboard/Books",AdminController.books);
router.get("/Add-book",AdminController.Addbook);

router.post("/new-book",AdminController.addnewbook );
router.get("/Book-requests",wrapAsync(AdminController.getRequest));

router.post("/:id/Accept",AdminController.accept );
router.post("/:id/Reject",AdminController.reject );

router.get("/students",AdminController.students);
router.get("/Add-Admin",AdminController.addadmin);
router.post("/new-admin",AdminController.addnewadmin );

router.get("/issued-books",AdminController.issuebooks );
router.get("/Returned-books",AdminController.returnbooks );
router.get("/Logout",AdminController.logout)
router.post("/:id/delete",AdminController.deletebook);
router.post("/:id/delete-student",AdminController.deletestudent);
module.exports = router;
