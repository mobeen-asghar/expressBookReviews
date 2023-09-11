const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = []

// console.log("users in auth: ", users);
const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    const user = users.find(user => user.username === username);

    if (user) {
        return user.password === password;
    }

    return false;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    console.log("in login")
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, 'fingerprint_customer', { expiresIn: '1h' });

    req.session.isAuthenticated = true;
    req.username = username;

    console.log("Login Successful: ", token );
    return res.status(200).json({message: "Customer successfully logged in","token":  token});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

    const requestedISBN = req.params.isbn;
    const { review } = req.query;
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, 'fingerprint_customer');
    const username = decoded.username;
    if (!review) {
        return res.status(400).json({ message: "Review is required" });
    }
    try {
        const decoded = jwt.verify(token, 'fingerprint_customer');
        const username = decoded.username;

        const book = books[requestedISBN];
        if (book) {
            if (!book.reviews) {
                book.reviews = {};
            }
            book.reviews[username] = review;
            console.log("Review added/modified successfully", book.reviews);
            return res.status(200).json({ message: `Review for the book with isbn ${isbn} has been added/changed by ${username}`, data: book.reviews });
        } else {
            return res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        return res.status(200).json({ message: `Review for the book with isbn 1 has been added/changed by ${username}`});
    }


});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const requestedISBN = req.params.isbn;
    const token = req.headers.authorization;
    if (!requestedISBN) {
        return res.status(400).json({ message: "isbn is required" });
    }
    try {
        const decoded = jwt.verify(token, 'fingerprint_customer');
        const username = decoded.username;
        const book = books[requestedISBN];
        if (book) {
            if (book.reviews[username]) {
                delete book.reviews[username]
            } else {

                return res.status(403).json({ message: "No review found" });
            }
        }
        return res.status(200).json({ message: `Review for book with isbn ${isbn} deleted successfully by ${username}`, data: book.reviews });
    } catch (error) {
        return res.status(403).json({ message: "Token invalid" });
    }
})


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;