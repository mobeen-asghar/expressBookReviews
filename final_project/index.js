const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bodyParser = require('body-parser'); // No need for express.json() with body-parser
const customer_routes = require('./router/auth_users.js').authenticated;

const genl_routes = require('./router/general.js').general;

// console.log("gen:", genl_routes)
// console.log("cus:", customer_routes)

const app = express();

// Use body-parser middleware for parsing JSON bodies
app.use(bodyParser.json());

// Initialize express-session middleware
app.use("/customer", session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true
}));

// JWT Secret Key
const JWT_SECRET = "fingerprint_customer"; // Replace with a strong secret key

//Authentication middleware for protected routes
app.use("/customer/auth/*", function auth(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.status(401).json({ message: "Not authenticated" });
    }else{
        console.log("authenticated!")
    }

    // Continue to the next middleware/route
    next();
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running on port", PORT));