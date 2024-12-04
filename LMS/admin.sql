use lms;
create table admin(
    adminname varchar(40),
    email varchar(100),
    role varchar(50),
    password varchar(30),
    mobilenumber varchar(50)
);
insert into admin(adminname,email,role,password,mobilenumber)
values
("Rohit Bansal","Rohitbansal53@gmail.com","Librarian","rohit12345","7865432189");
