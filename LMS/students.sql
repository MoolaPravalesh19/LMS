use lms;
create table students(
   libraryid int auto_increment primary key,
   studentname varchar(40),
   branch varchar(50),
   email varchar(50),
   password varchar(50) unique
);
 
 insert into students(studentname,branch,email,password)
 values
 ("Mayank Rana","Computer Science And Engineering","mayank45@gmail.com","Mayank2002"),
 ("Mohan kumar","Information Technology","mohank2@gmail.com","Mohank2003"),
 ("Nitish kumar Reddy","Mechanical Engineering","nitishkr13@gmail.com","Reddy2018"),
 ("Rishav Kumar Singh","Information Technology","Rishku132@gmail.com","Rish200319"),
 ("Sayan Barma","Civil Engineering","sayanbr5@gmail.com","Saybr2103"),
 ("Rishank Devadika","Electronics And Communication Engineering","rishakk67@gmail.com","Rishak2003");
