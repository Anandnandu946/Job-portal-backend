//import userSchema or model
const users = require('../Models/userSchema')
//import jwt token
const jwt = require('jsonwebtoken');

//Register logic
exports.register = async (req, res) => {
    //1.accepts data from client
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        //check if the email is already registered
        const existingUser = await users.findOne({ email })
        console.log(existingUser);
        if (existingUser) {
            res.status(406).json("User already registered")
        } else {
            const newUser = new users({
                username,
                email,
                password,

            })
            await newUser.save()

            res.status(200).json(newUser) //json(newuser) is for apply the details in frontend pages
        }

    } catch (error) {
        res.status(500).json("Register failed..")
    }
}


//Login logic
exports.login = async (req, res) => {
    //accept data from client
    const { email, password } = req.body
    try {
        //check if email and password in db
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, "super2024")
            console.log(token);
            res.status(200).json({ existingUser, token })
        } else {
            res.status(404).json("Invalid email or password")
        }
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message })
    }
}

// Get all usernames
exports.allUsers = async (req, res) => {
    const searchKey = req.query.search;
    console.log(searchKey);
    // Case insensitive search by username
    let query = {};
    if (searchKey) {
        query.username = { $regex: searchKey, $options: "i" };
    }

    try {
        // Find users with only the username field
        const allUsers = await users.find(query, 'username');
        if (allUsers.length > 0) {
            res.status(200).json(allUsers);
        } else {
            res.status(401).json("No users found");
        }
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}