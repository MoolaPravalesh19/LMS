const samplebooks=[
    {
        Title: "To Kill a Mockingbird",
        Author: "Harper Lee",
        ISBN: "978-0-06-112008-4",
        Edition: "50th Anniversary Edition (2010)"
    },
    {
        Title: "1984",
        Author: "George Orwell",
        ISBN: "978-0-452-28423-4",
        Edition: "Signet Classics Edition (2003)"
    },
    {
        Title: "The Great Gatsby",
        Author: "F. Scott Fitzgerald",
        ISBN: "978-0-7432-7356-5",
        Edition: "Scribner Classics Edition (2004)"
    },
    {
        Title: "Pride and Prejudice",
        Author: "Jane Austen",
        ISBN: "978-0-19-953556-9",
        Edition: "Oxford World's Classics Edition (2008)"
    },
    {
        Title: "The Catcher in the Rye",
        Author: "J.D. Salinger",
        ISBN: "978-0-316-76948-0",
        Edition: "Little, Brown and Company Edition (2001)"
    },
    {
        Title: "The Alchemist",
        Author: "Paulo Coelho",
        ISBN: "978-0-06-231500-7",
        Edition: "HarperOne Edition (2014)"
    },
    {
        Title: "The Hobbit",
        Author: "J.R.R. Tolkien",
        ISBN: "978-0-618-00221-3",
        Edition: "Houghton Mifflin Edition (2001)"
    },
    {
        Title: "Fahrenheit 451",
        Author: "Ray Bradbury",
        ISBN: "978-1451673319",
        Edition: "Simon & Schuster Edition (2012)"
    },
    {
        Title: "The Diary of a Young Girl",
        Author: "Anne Frank",
        ISBN: "978-0-553-57740-9",
        Edition: "Bantam Books Edition (1993)"
    },
    {
        Title: "The Picture of Dorian Gray",
        Author: "Oscar Wilde",
        ISBN: "978-0-14-143957-0",
        Edition: "Penguin Classics Edition (2003)"
    }
];

const SampleStudents = [
    { username: "Abhinav Kumar", branch: "Computer Science And Engineering", email: "abhinavkumar4@gmail.com",password: "Abhi2056"},
    { username: "Mayank Yadav", branch: "Electrical Engineering", email: "mayankyadav@gmail.com",password: "Ank@1979"},
    { username: "Sandeep Sharma", branch: "Mechanical Engineering", email: "sandysharma@gmail.com",password: "San@29712"},
    { username: "Nihal Kumar Yadav", branch: "Civil Engineering", email: "nihalyadav@gmail.com",password: "yakum@78689"},
];

const sampleadmins = {
    username: "Roshan Kumar", // Corrected from userame to username
    Email: "Roshantech@gmail.com",
    Phonenumber: "+91 555-123-4567",
    password:"bcet1976"
}

module.exports = {
    sampleadmins,
    data2: SampleStudents,
    data1: samplebooks
};
