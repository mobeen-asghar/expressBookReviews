const express = require('express');
let books = require("./booksdb.js");
const jwt = require('jsonwebtoken');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const registeredUsernames = [];
public_users.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if username or password is missing
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the username already exists
    if (isValid(username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    // Register the new user
    users.push({ username, password });

    console.log("user registered: ", { username, password })
    return res.status(201).json({ message: "Customer successfully registered, you can now login"});
});

// Get the book list available in the shop
// public_users.get('/', async function (req, res) {
//     //Write your code here
//     return res.status(200).json(books);
// });

//GET ALL BOOKS USING AXIOS

// public_users.get('/', async function (req, res) {
//     try {
//         // Fetch books using Axios
//         const response = await axios.get('https://mobiasmobeen-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/');

//         const bookList = response.data;
//         return res.status(200).json(bookList);
//     } catch (error) {
//         return res.status(500).json({ message: "Error fetching book list" });
//     }
// });

//GET ALL BOOKS USING PROMSE

public_users.get('/', function (req, res) {
    // Simulate an asynchronous operation using a Promise
    const getBooks = new Promise((resolve, reject) => {
        // Assume fetching books is an async operation
        setTimeout(() => {
            resolve(books);
        }, 1000); // Simulating a delay of 1 second
    });

    getBooks.then((bookList) => {
        return res.status(200).json({ mesage: "Books found", data: { bookList } });
    }).catch((error) => {
        return res.status(500).json({ message: "Error fetching book list" });
    });
});





// =================== TASK 11 ===============================================================

// Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
//     //Write your code here
//     const requestedISBN = req.params.isbn;

//     return res.status(200).json(books[requestedISBN])
// });


// GET BOOK USING AXIOS
// public_users.get('/isbn/:isbn', async function (req, res) {
//     const requestedISBN = req.params.isbn;

//     try {
//         // Fetch book details using Axios
//         const response = await axios.get(`https://mobiasmobeen-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/${requestedISBN}`); 

//         const bookDetails = response.data;
//         return res.status(200).json(bookDetails);
//     } catch (error) {
//         return res.status(404).json({ message: "Book not found" });
//     }
// });

// GET BOOK USING ISBN PROMISES
public_users.get('/isbn/:isbn', function (req, res) {
    const requestedISBN = req.params.isbn;

    // Simulate an asynchronous operation using a Promise
    const getBookDetails = new Promise((resolve, reject) => {
        // Assume fetching book details is an async operation
        setTimeout(() => {
            const bookDetails = books[requestedISBN];
            if (bookDetails) {
                resolve(bookDetails);
            } else {
                reject({ message: "Book not found" });
            }
        }, 1000); // Simulating a delay of 1 second
    });

    getBookDetails.then((book) => {
        return res.status(200).json(book);
    }).catch((error) => {
        return res.status(404).json(error);
    });
});

// ========================== TASK 12 ===================================

// Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//     //Write your code here
//     const requestedAuthor = req.params.author; // Extract the author parameter from the URL

//     // Filter books based on the requested author
//     const booksByAuthor = Object.values(books).filter(book => book.author === requestedAuthor);

//     // Return the filtered books (if any)
//     if (booksByAuthor.length > 0) {
//         return res.status(200).json(booksByAuthor);
//     } else {
//         return res.status(404).json({ message: "No books found for the requested author" });
//     }
// });

// GET BOOK BY AUTHOR AXIOS
// public_users.get('/author/:author', async function (req, res) {
//     const requestedAuthor = req.params.author;

//     try {
//         // Fetch books by author using Axios
//         const response = await axios.get(`https://mobiasmobeen-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/author/${requestedAuthor}`); 

//         const booksByAuthor = response.data;
//         return res.status(200).json(booksByAuthor);
//     } catch (error) {
//         return res.status(404).json({ message: "No books found for the requested author" });
//     }
// });


// GET BOOK BY AUTHOR PROMISES
public_users.get('/author/:author', function (req, res) {
    const requestedAuthor = req.params.author;

    // Simulate an asynchronous operation using a Promise
    const getBooksByAuthor = new Promise((resolve, reject) => {
        // Assume fetching books by author is an async operation
        setTimeout(() => {
            const booksByAuthor = Object.values(books).filter(book => book.author === requestedAuthor);
            if (booksByAuthor.length > 0) {
                resolve(booksByAuthor);
            } else {
                reject({ message: "No books found for the requested author" });
            }
        }, 1000); // Simulating a delay of 1 second
    });

    getBooksByAuthor.then((books) => {
        return res.status(200).json({ "booksbyauthor:": books });
    }).catch((error) => {
        return res.status(404).json(error);
    });
});


// =================================== TASK 13 =========================

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const requestedTitle = req.params.title; // Extract the title parameter from the URL

    // Filter books based on the requested title
    const booksByTitle = Object.values(books).filter(book => book.title === requestedTitle);

    // Return the filtered books (if any)
    if (booksByTitle.length > 0) {
        return res.status(200).json({"booksByTitle": booksByTitle});
    } else {
        return res.status(404).json({ message: "No books found for the requested title" });
    }
});

// get books by title PROMISES
public_users.get('/title/:title', function (req, res) {
    const requestedTitle = req.params.title;

    // Simulate an asynchronous operation using a Promise
    const getBooksByTitle = new Promise((resolve, reject) => {
        // Assume fetching books by title is an async operation
        setTimeout(() => {
            const booksByTitle = Object.values(books).filter(book => book.title === requestedTitle);
            if (booksByTitle.length > 0) {
                resolve(booksByTitle);
            } else {
                reject({ message: "No books found for the requested title" });
            }
        }, 1000); // Simulating a delay of 1 second
    });

    getBooksByTitle.then((books) => {
        return res.status(200).json(books);
    }).catch((error) => {
        return res.status(404).json(error);
    });
});

// get books by title axios
public_users.get('/title/:title', async function (req, res) {
    const requestedTitle = req.params.title;

    try {
        // Fetch books by title using Axios
        const response = await axios.get(`https://mobiasmobeen-5000.theiadocker-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/title/${requestedTitle}`);

        const booksByTitle = response.data;
        return res.status(200).json(booksByTitle);
    } catch (error) {
        return res.status(404).json({ message: "No books found for the requested title" });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const requestedISBN = req.params.isbn; // Extract the ISBN parameter from the URL

    // Find the book based on the requested ISBN
    const book = books[requestedISBN];

    // If book is found, return its reviews; otherwise, return an error message
    if (book) {
        const reviews = book.reviews;
        return res.status(200).json(reviews);
    } else {
        return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
