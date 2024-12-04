let express = require("express");
let app = express();
let port = 3000;
let path = require("path");
const mysql = require("mysql2");
let method_override = require("method-override");
app.use(method_override("_method"));
app.use(express.urlencoded({ extended: true }));
const alert = require("alert-node");
const date = require("date-and-time");
const { connect } = require("http2");

app.set("view engine", "ejs");
//app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname, "public")));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "LMS",
  password: "Pro@2003",
});
app.listen(port, (req, res) => {
  console.log(`current port number ${port}`);
});

app.get("/Library", (req, res) => {
  console.log(path.join(__dirname + "/index.html"));
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/Library/Dashboard/Logout",(req,res)=>{
  res.redirect("/Library");
})
app.post("/Library/Login", (req, res) => {
  let { Libraryid: Libraryid, password: password } = req.body;
  // console.log(Libraryid);
  // let q = `select count(*) from students`;
  // try {
  //     connection.query(q, (err, result) => {
  //         if (err) throw err;
  //         let count = result[0]["count(*)"];
  //         console.log(req.body);
  //         let q1 = `select * from students`;
  //         try {
  //             connection.query(q1, (err, result) => {
  //                 if (err) throw err;
  //                 console.log(count);
  //                 console.log(result);
  //                 let flag=false;
  //                 for (let i = 0; i < count; i++) {
  //                     let student = result[i].studentid;
  //                     console.log(student);

  //                     if (Libraryid == student) {
  //                         flag=true;
  //                         break;
  //                     }
  //                 }
  //                 if(flag){
  //                     return res.render("editprofile.ejs");
  //                 }
  //                 else{
  //                     return res.redirect("/Library");
  //                     alert("No such student exsists");

  //                 }
  //                 console.log(Libraryid);
  //             })

  //         }
  //         catch (err) {
  //             console.log(err);
  //         }
  //     })
  // }
  // catch (err) {
  //     console.log(err);
  // }
  // console.log(req.body);
  console.log(password == "");
  if (Libraryid == "") {
    alert("Please Provide necessary Details");
    res.redirect("/Library");
  } else {
    let q = `select *from students where libraryid=${Libraryid} AND password="${password}"`;
    let q1 = `select count(*) from issuebook where libraryid=${Libraryid}`;
    let q2 = `select count(*) from books`;
    let q3 = `select count(*) from returnbook where libraryid=${Libraryid}`;
    let q4 = `select count(*) from bookaccept where libraryid=${Libraryid}`;
    let q5 = `select count(*) from bookreject where libraryid=${Libraryid}`;
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let studentinfo = result[0];
        console.log(studentinfo);
        if (result[0] != undefined){
          connection.query(q1, (err, result) => {
            if (err) throw err;
            console.log(result[0]["count(*)"]);
            let countissue = result[0]["count(*)"];
            console.log(studentinfo);
            connection.query(q2, (err, result) => {
              if (err) throw err;
              console.log(result);
              let countbook = result[0]["count(*)"];
              console.log(countbook);
              connection.query(q3, (err, result) => {
                if (err) throw err;
                let countreturn = result[0]["count(*)"];
                //let attendance=[studentinfo.libraryid,studentinfo.studentname,studentinfo.branch,formattedDate];
                //console.log(attendance);
                connection.query(q4,(err,result)=>{
                  if(err) throw err;
                  let countaccept = result[0]["count(*)"];
                  connection.query(q5,(err,result)=>{
                    let countreject = result[0]["count(*)"];
                    res.render("Dashboard.ejs", {
                      studentinfo,
                      countissue,
                      countbook,
                      countreturn,
                      countaccept,
                      countreject
                    });
                  })
                })

                // connection.query(q4, (err, result) => {
                // if (err) throw err;
                // console.log(req.body);
                // });
              });
            });
          });
        } else {
          alert("Credentials doesn't match");
          res.redirect("/Library");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  // try {
  //     connection.query(q,(err, result2) => {
  //         if (err) throw err;
  //         console.log(result2);

  //     })
  // }
  // catch (err) {
  //     console.log(err);
  // }
  // const date = require('date-and-time');
});
app.get("/Library/registration", (req, res) => {
  res.render("studentregistration.ejs");
});

app.post("/Library/Admin", (req, res) => {
  let { admin: admin, password: password } = req.body;
  if ((admin == "") & (password == "")) {
    alert("Please Provide necessary Details");
    res.redirect("/Library");
  }
  else {
    let q = `select *from admin where adminname='${admin}' AND password="${password}"`;
    let q1 = `select count(*) from issuebook`;
    let q2 = `select count(*) from books`;
    let q3 = `select count(*) from returnbook`;
    let q4 = `select count(*) from students`;
    let q5=`select count(*) from bookrequest`;
    let q6=`select count(*) from bookaccept`;
    let q7=`select count(*) from bookreject`;
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let admininfo = result[0];
        if (result[0] != undefined) {
          connection.query(q1, (err, result) => {
            if (err) throw err;
            console.log(result[0]["count(*)"]);
            let countissue = result[0]["count(*)"];
            connection.query(q2, (err, result) => {
              if (err) throw err;
              console.log(result);
              let countbook = result[0]["count(*)"];
              console.log(countbook);
              connection.query(q3, (err, result) => {
                if (err) throw err;
                let countreturn = result[0]["count(*)"];
                //let attendance=[studentinfo.libraryid,studentinfo.studentname,studentinfo.branch,formattedDate];
                //console.log(attendance);
                connection.query(q4, (err, result) => {
                  let countstudents = result[0]["count(*)"];
                  console.log(countstudents);
                  connection.query(q5,(err,result)=>{
                    if(err) throw err;
                    let countrequest = result[0]["count(*)"];
                    connection.query(q6,(err,result)=>{
                      if(err)throw err;
                      let countaccept = result[0]["count(*)"];
                      connection.query(q7,(err,result)=>{
                        if(err)throw err;
                        let countreject = result[0]["count(*)"];
                        res.render("admindashboard.ejs", {
                          admininfo,
                          countissue,
                          countbook,
                          countreturn,
                          countstudents,
                          countrequest,
                          countaccept,
                          countreject
                        });
                      })
                    })
                  })
                });
              });

              // connection.query(q4, (err, result) => {
              // if (err) throw err;
              // console.log(req.body);
              // });
            });
          });
        } else {
          alert("Credentials doesn't match");
          res.redirect("/Library");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});
app.post("/Library/Register/Dashboard", (req, res) => {
  console.log(req.body);
  let studentinfo = req.body;
  
  console.log(studentinfo.studentname);
  let student = [
    studentinfo.studentname,
    studentinfo.branch,
    studentinfo.email,
    studentinfo.password,
  ];
  console.log(student);
  if(studentinfo.studentname=='' || studentinfo.branch=='' || studentinfo.email=='' || studentinfo.password==''){
    alert("Please Neccessary Details");
    res.redirect("/Library");
  }
else{
  let q = `insert into students(studentname,branch,email,password) values (?,?,?,?)`;
  try {
    connection.query(q, student, (err, result) => {
      if (err) throw err;
      //console.log(result[0]["count(*)"]);
      //let count=result[0]["count(*)"];
      //console.log(createRandomUser());
      console.log(req.body);
      res.redirect("/Library");
      alert("Student Has Been Successfully Registered");
    });
  }
  catch (err) {
    console.log(err);
  }
}
  
});

app.get("/Library/Dashboard/Books", (req, res) => {
  //let q="insert into tabledata(id,username,email,password) values ?";
  let q = `select * from Books`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //console.log(result[0]["count(*)"]);
      //let count=result[0]["count(*)"];
      //console.log(createRandomUser());
      console.log({ result });
      res.render("Book-list-student.ejs", { result });
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/Library/admin/Dashboard/Books", (req, res) => {
  //let q="insert into tabledata(id,username,email,password) values ?";
  let q = `select * from Books`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //console.log(result[0]["count(*)"]);
      //let count=result[0]["count(*)"];
      //console.log(createRandomUser());
      console.log({ result });
      res.render("Book-list-admin.ejs", { result });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/Library/Admin/Dashboard/Student-List", (req, res) => {
  let q = `select *from students`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //console.log(result[0]["count(*)"]);
      //let count=result[0]["count(*)"];
      //console.log(createRandomUser());
      console.log({ result });
      res.render("student-list.ejs", { result });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/Dashboard/:libraryid/issued-books", (req, res) => {
  let libraryid = req.params.libraryid;
  console.log(libraryid);
  let q = `select *from issuebook where libraryid=${libraryid}`;
  let q1 = `select *from students where libraryid=${libraryid}`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]);
      let user = result;
      if (result[0] == undefined) {
        alert("No book issued by the Student");
        res.render("not-issued-book.ejs");
      } else {
        try {
          connection.query(q1, (err, result) => {
            if (err) throw err;
            let student = result[0];
            res.render("issued-books.ejs", { user, student });
          });
        } catch (err) {
          console.log(err);
        }
        //res.render("issued-books.ejs",{user});

        console.log(user[0]["libraryid"]);
        console.log(user[0]["issuedate"]);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/Dashboard/:bookid/issued-book", (req, res) => {
  let { bookid } = req.params;
  console.log(bookid);
  let q = `select *from issuebook where bookid='${bookid}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      console.log(user);
      let student = [
        user.libraryid,
        user.studentname,
        user.branch,
        user.bookid,
        user.issuebook,
        user.returndate
      ];
      console.log(student);
      let q1 = `insert into returnbook(libraryid,studentname,branch,bookid,returnbook,returndate) values (?,?,?,?,?,?)`;
      try {
        connection.query(q1, student, (err, result) => {
          if (err) throw err;
          //console.log(result[0]["count(*)"]);
          //let count=result[0]["count(*)"];
          //console.log(createRandomUser());
          console.log(result);
          let q2 = `delete from issuebook where bookid='${bookid}'`;
          try {
            connection.query(q2, (err, result) => {
              if (err) throw err;
              console.log(result[0]);
              res.redirect("/Dashboard/libraryid/issued-books");
            });
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
// app.get("/Dashboard/:studentid/Returned-books",(req,res)=>{
//   let studentid = req.params.studentid;
//   console.log(studentid);
//   let q = `select *from returnbook where studentid=${studentid}`;
//   try {
//     connection.query(q, (err, result) => {
//       if (err) throw err;
//       console.log(result[0]);
//       let user = result;
//       if (result[0] == undefined) {
//         res.render("not-returned-book.ejs");
//       } else {
//         //res.render("issued-books.ejs",{user});
//         res.render("returned-books.ejs", { user });
//         console.log(user);
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// })
app.get("/Dashboard/:libraryid/Returned-books", (req, res) => {
  let libraryid = req.params.libraryid;
  console.log(libraryid);
  let q = `select *from returnbook where libraryid=${libraryid}`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]);
      let user = result;
      if (result[0] == undefined) {
        res.render("not-returned-book.ejs");
      } else {
        //res.render("issued-books.ejs",{user});
        res.render("returned-books.ejs", { user });
        console.log(user);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/Dashboard/:libraryid/issuebook", (req, res) => {
  let libraryid = req.params.libraryid;
  let q = `select *from  students where libraryid=${libraryid}`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      user = result[0]["libraryid"];
      console.log(result[0]["libraryid"]);
      res.render("issue-book.ejs", { user });
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/Dashboard/issue-book", (req, res) => {
  let {
    libraryid: libraryid,
    studentname: studentname,
    branch: branch,
    bookid: bookid,
    bookname: bookname,
    issuedate: issuedate,
    returndate: returndate,
  } = req.body;
  console.log(req.body);
  let q = `select *from students where libraryid=${libraryid}`;
  let q1 = `select *from books where bookid='${bookid}'`;
  let q2 = `insert into bookrequest(libraryid,studentname,branch,bookid,issuebook,issuedate,returndate) values (?,?,?,?,?,?,?)`;
  let q3=`select *from bookrequest where bookid='${bookid}' AND libraryid=${libraryid}`;
  let q4 =`select *from issuebook where bookid='${bookid}' AND libraryid=${libraryid}`;
  if (
    libraryid == "" ||
    studentname == "" ||
    bookid == "" ||
    bookname == "" ||
    issuedate == "" ||
    returndate == ""
  ) {
    alert("Please provide necessary details");
    res.redirect("/Dashboard/libraryid/issuebook");
  }
  else {
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        console.log(result[0]);
        try {
          connection.query(q1, (err, result) => {
            if (err) throw err;
            let book = result[0];
            console.log(book);
            if (user != undefined && user["studentname"] == studentname && user["branch"] == branch && book["bookid"] == bookid && book["bookname"] == bookname) {
              let data = [user.libraryid,user.studentname,user.branch,book.bookid,book.bookname,issuedate,returndate,];
              console.log(data);
              try{
                connection.query(q4,(err,result)=>{
                  if(err) throw err;
                  console.log("result",result[0]);
                  let check=result[0];
                  if(check==undefined){
                    try{
                      connection.query(q3,(err,result)=>{
                        if(err) throw err;
                        console.log(result[0]);
                        if(result[0]==undefined){
                         try {
                           connection.query(q2, data, (err, result) => {
                             if (err) throw err;
                             console.log(result);
                             console.log(data);
                             alert("Request is successfully done to the librarian");
                             res.redirect(`/Dashboard/${libraryid}/issuebook`);
                             });
                          } 
                          catch (err) {
                           console.log(err);
                          }
                       }
                       else{
                         alert("The book Had already been requested wait for the librarian's response");
                         res.redirect(`/Dashboard/${libraryid}/issuebook`);
                       }
                      })
                     }
                     catch(err){
                       console.log(err);
                     }
                  }
                  else{
                    alert("Book Had already been issued!");
                    res.redirect(`/Dashboard/${libraryid}/issuebook`);
                  }
                })
                 
              }
              catch(err){
                console.log(err);
              }
               
            }
            else{
              alert("Credentials doesn't match");
              res.redirect("/Dashboard/libraryid/issuebook");
            }
          });
        } catch (err) {
          console.log(err);
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/Admin/Dashboard/Add-book", (req, res) => {
  res.render("add-book.ejs");
});
app.post("/Admin/Dashboard/Add-book", (req, res) => {
  let {
    bookid: bookid,
    bookname: bookname,
    publishername: publishername,
  } = req.body;
  console.log(req.body);
  if (bookid == "" || bookname == "" || publishername == "") {
    alert("Please Provide Necessary Details");
    res.render("add-book.ejs");
  } else {
    let q = `select *from books where bookid='${bookid}'`;
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let book = result[0];
        console.log(book);
        if (book != undefined) {
          res.render("add-book.ejs");
        } else {
          bookdetails = [bookid, bookname, publishername];
          q = "insert into books(bookid,bookname,authorname) values(?,?,?)";
          try {
            connection.query(q, bookdetails, (err, result) => {
              if (err) throw err;
              console.log("RESULT" + result[0]);
              res.render("add-book.ejs");
              alert("The book is successful added in the Book Record");
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
});

app.get("/Dashboard/Admin/issuedbook", (req, res) => {
  let q = "select *from issuebook";
  try {
    connection.query(q, (err, result) => {
      console.log(result[0]);
      let user = result;
      res.render("adminissue-book.ejs", { user });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/Dashboard/Admin/Add-admin", (req, res) => {
  res.render("addadmin.ejs");
});

app.post("/Dashboard/Admin/Add-Admin", (req, res) => {
  let {
    membername: membername,
    role: role,
    email: email,
    password: password,
    mobilenumber: mobilenumber,
  } = req.body;
  console.log(req.body);
  let q = `select *from admin where adminname='${membername}'`;
  let q1 = `insert into admin(adminname,email,role,password,mobilenumber) values(?,?,?,?,?)`;
  //let q2 = `insert into issuebook(libraryid,studentname,branch,bookid,issuebook,issuedate,returndate) values (?,?,?,?,?,?,?)`;
  if (
    membername == "" ||
    role == "" ||
    email == "" ||
    password == "" ||
    mobilenumber == ""
  ) {
    alert("Please provide necessary details");
    res.redirect("/Dashboard/Admin/Add-Admin");
  } else {
    try {
      connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        console.log(user);
        let data = [membername, email, role, password, mobilenumber];
        if (user == undefined) {
          try {
            connection.query(q1, data, (err, result) => {
              if (err) throw err;
              alert("Member is successfully added");
              res.redirect("/Dashboard/Admin/Add-Admin");
            });
          } catch (err) {
            console.log(err);
          }
        } else {
          alert("Admin already exsist");
          res.redirect("/Dashboard/Admin/Add-Admin");
        }

        // try {
        //   connection.query(q1, (err, result) => {
        //     if (err) throw err;
        //     let book = result[0];
        //     console.log(book);
        //     if (
        //       user != undefined &&
        //       user["studentname"] == studentname &&
        //       user["branch"] == branch &&
        //       book["bookid"] == bookid &&
        //       book["bookname"] == bookname
        //     ) {
        //       let data = [
        //         user.libraryid,
        //         user.studentname,
        //         user.branch,
        //         book.bookid,
        //         book.bookname,
        //         issuedate,
        //         returndate,
        //       ];
        //       console.log(data);
        //       try {
        //         connection.query(q2, data, (err, result) => {
        //           if (err) throw err;
        //           console.log(result);
        //         });
        //       } catch (err) {
        //         console.log(err);
        //       }
        //       alert("Successfully Issued A Book");
        //       res.redirect(`/Dashboard/${libraryid}/issuebook`);
        //     } else {
        //       alert("Credentials doesn't match");
        //       res.redirect("/Dashboard/libraryid/issuebook");
        //     }
        //   });
        // } catch (err) {
        //   console.log(err);
        // }
      });
    } catch (err) {
      console.log(err);
    }
  }
});
app.get("/Admin/Dashboard/accept-reject", (req, res) => {
  let q = "select *from bookrequest";
  try {
    connection.query(q, (err, result) => {
      let user = result;
      console.log(user);
      if (result[0] != undefined) {
        res.render("bookrequest.ejs", { user });
      } else {
        res.render("no-request.ejs");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/Dashboard/:bookid/:libraryid/accept", (req, res) => {
  let { bookid: bookid, libraryid: libraryid } = req.params;
  console.log(bookid, libraryid);
  q = `select *from bookrequest where bookid='${bookid}' AND libraryid=${libraryid}`;
  q1 = `insert into issuebook(libraryid,studentname,branch,bookid,issuebook,issuedate,returndate) values(?,?,?,?,?,?,?)`;
  q2 = `delete from bookrequest where bookid='${bookid}' AND libraryid=${libraryid}`;
  let q3=`insert into bookaccept(libraryid,studentname,branch,bookid,issuebook,issuedate,returndate) values (?,?,?,?,?,?,?)`;
  try {
    connection.query(q,(err, result) => {
      if (err) throw err;
      console.log(result);
      let book = result[0];
      let bookrequest = [
        book.libraryid,
        book.studentname,
        book.branch,
        book.bookid,
        book.issuebook,
        book.issuedate,
        book.returndate,
      ];
      console.log(bookrequest);
      try {
        connection.query(q1, bookrequest, (err, result) => {
          if (err) throw err;
          console.log(result);
        });
        try {
          connection.query(q2, (err, result) => {
            if (err) throw err;
            console.log(result);
            connection.query(q3,bookrequest,(err,result)=>{
              if(err)throw err;
              console.log(result);
              res.render("request-success.ejs")
            })
            
          });
        } 
        catch (err) {
          console.log(err);
        }
      }
      catch (err) {
        console.log(err);
      }
    });
  }
  catch (err) {
    console.log(err);
  }
});
app.post("/Dashboard/:bookid/:libraryid/reject", (req, res) => {
  let { bookid: bookid, libraryid: libraryid } = req.params;
  console.log(bookid, libraryid);
  q = `select *from bookrequest where bookid='${bookid}' AND libraryid=${libraryid}`;
  q1 = `insert into bookreject(libraryid,studentname,branch,bookid,issuebook,issuedate,returndate) values(?,?,?,?,?,?,?)`;
  q2 = `delete from bookrequest where bookid='${bookid}' AND libraryid=${libraryid}`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result);
      let book = result[0];
      let bookrequest = [
        book.libraryid,
        book.studentname,
        book.branch,
        book.bookid,
        book.issuebook,
        book.issuedate,
        book.returndate,
      ];
      console.log(bookrequest);
      try {
        connection.query(q1, bookrequest, (err, result) => {
          if (err) throw err;
          console.log(result);
        });
        try {
          connection.query(q2, (err, result) => {
            if (err) throw err;
            console.log(result);
          });
        }
        catch (err) {
          console.log(err);
        }
      }catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/Admin/Dashboard/returned-books",(req,res)=>{
  let q=`select *from returnbook`;
  try{
    connection.query(q,(err,result)=>{
      if(err)throw err;
      console.log(result);
      let user = result;
      res.render("adminreturned-book.ejs", { user });
    })
  }
  catch(err){
    console.log(err);
  }
})

app.get("/Library/Dashboard/:libraryid/Rejected-requests",(req,res)=>{
  let {libraryid}=req.params;
  console.log(libraryid)
  let q=`select *from bookreject where libraryid=${libraryid}`;
  try{
    connection.query(q,(err,result)=>{
      if(err)throw err;
      console.log(result[0]);
      let user=result;
      res.render("reject.ejs",{user});
    })
  }
  catch(err){
    console.log(err);
  }
});

app.get("/Library/Dashboard/:libraryid/Accepted-requests",(req,res)=>{
  let {libraryid}=req.params;
  console.log(libraryid)
  let q=`select *from bookaccept where libraryid=${libraryid}`;
  try{
    connection.query(q,(err,result)=>{
      if(err)throw err;
      console.log(result[0]);
      let user=result;
      res.render("accept.ejs",{user});
    })
  }
  catch(err){
    console.log(err);
  }
})
