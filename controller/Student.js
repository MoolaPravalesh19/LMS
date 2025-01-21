const Book=require("../models/bookdetails");
const issueBook=require("../models/issued-books");
const returnbook=require("../models/returned-books");
const Rejected = require("../models/rejected");
const Accepted=require("../models/accepted");

module.exports.books=async (req, res) => {
    const Books = await Book.find({});
    res.render("student/book-list.ejs", { Books });
  }
module.exports.issuebook=(req, res) => {
    let {id}=req.params;
    res.render("student/issuebook.ejs",{id});
}
module.exports.issuedetails=async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    const issuebooks=await issueBook.find({Libraryid:id});
    res.render("student/issued-books.ejs",{issuebooks});
    
}
module.exports.returnbook=async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    const returnbooks=await returnbook.find({Libraryid:id});
    res.render("student/returned-book.ejs",{returnbooks});
}
module.exports.returndetails=async(req,res)=>{
    let { id1: id1, id2: id2 } = req.params;
    console.log("para"+req.params.id1);
    let returns=await issueBook.findById(id1);
    console.log(returns.Libraryid+"hjkk");
    let returndata = new returnbook({
      Libraryid: returns.Libraryid,
      Studentname: returns.Studentname,
      Branch: returns.Branch,
      Bookname: returns.Bookname,
      Bookid: returns.Bookid,
      Issuedate: returns.Issuedate,
      Returndate: returns.Returndate,
    });
    returndata.save();
    
    res.redirect(`/Student/${returns.Libraryid}/issued-books`)
    let issuedelete=await issueBook.findByIdAndDelete(id1);
}
module.exports.Accepted=async(req,res)=>{
    let {id}=req.params;
    console.log(id)
    const accepted=await Accepted.find({Libraryid:id});
    console.log(accepted);
    res.render("student/Accepted.ejs",{accepted});
  }
module.exports.Rejected=async(req,res)=>{
    let {id}=req.params;
    console.log(id)
    const rejected=await Rejected.find({Libraryid:id});
    res.render("student/Rejected.ejs",{rejected});
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