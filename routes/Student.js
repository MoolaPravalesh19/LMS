const express = require("express");
const router = express.Router();
const Book=require("../models/bookdetails");
const issueBook=require("../models/issued-books");
const returnbook=require("../models/returned-books");
const Rejected = require("../models/rejected");
const Accepted=require("../models/accepted");
const studentcontroller=require("../controller/Student")

router.get("/books",studentcontroller.books );
  router.get("/:id/issue-book",studentcontroller.issuebook );
  router.get("/:id/issued-books",studentcontroller.issuedetails)
  router.get("/:id/Returned-books",studentcontroller.returnbook)
  router.post("/:id1/:id2/return",studentcontroller.returndetails);
  router.get("/:id/Accepted-requests",studentcontroller.Accepted)
  router.get("/:id/Rejected-requests",studentcontroller.Rejected);
router.get("/Logout",studentcontroller.logout)
  module.exports=router;