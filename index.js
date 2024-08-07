// Load .env file contents into process.env by default
require('dotenv').config();

// Import express
const express = require('express');

// Import cors
const cors = require('cors');

// Import DB
const db = require('./DB/connection');

// Import router
const router = require("./Routes/router");

// Import passport and session
const passport = require('passport');
const session = require('express-session');
require('./Config/passport-setup');

// Create an application using express
const pfServer = express();

// Use middleware
pfServer.use(cors());
pfServer.use(express.json()); // return middleware that only parses
pfServer.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
pfServer.use(passport.initialize());
pfServer.use(passport.session());

// Use application middleware (if needed)
// pfServer.use(applicationMiddleware);

// Use router
pfServer.use(router);

// Export images from backend
// pfServer.use('/uploads', express.static('./uploads'));

// Port creation
const PORT = process.env.PORT || 8000;

pfServer.listen(PORT, () => {
    console.log("pfserver listening on port " + PORT);
});

pfServer.get('/', (req, res) => {
    res.send("Welcome to job portal");
});
