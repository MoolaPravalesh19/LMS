use lms;
create table books(
  bookid varchar(20) primary key,
  bookname varchar(100),
  authorname varchar(200)
);
insert into books(bookid,bookname,authorname)
values
("LIZ02","SOFTWARE ENGINEERING","Ian Sommerville"),
("LIZ03","THE POWER OF SUBCONSCIOUS MIND","Dr Joseph Murphy"),
("LIZ04","Effective Java","Addison-Wesley"),
("LIZ05","Python Programming: An Introduction to Computer Science","John Zelle"),
("LIZ06","Python Cookbook","David Beazley and Brian Kernighan");