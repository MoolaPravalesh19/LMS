use lms;
create table bookrequest(
   libraryid int,
   studentname varchar(60),
   branch varchar(60),
   bookid varchar(10),
   issuebook mediumtext,
   issuedate varchar(20),
   returndate varchar(20)
);
select *from bookrequest;